from flask import Flask, request, jsonify
import pandas as pd
from datetime import datetime, timedelta
import os
from werkzeug.utils import secure_filename
import json
import calendar

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# In-memory storage (could be replaced with Redis in production)
user_data = {}

def allowed_file(filename):
    """Check if file has allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def calculate_month_fraction():
    """Calculate what fraction of the current month has passed"""
    today = datetime.now()
    days_in_month = calendar.monthrange(today.year, today.month)[1]
    return today.day / days_in_month

def parse_csv_file(file_path, user_id):
    """Parse CSV file and extract last 3 months of financial data"""
    try:
        # Read CSV file
        df = pd.read_csv(file_path)
        
        # Convert date column to datetime
        df['Date'] = pd.to_datetime(df['Date'])
        
        # Sort by date
        df = df.sort_values('Date')
        
        # Get the date 3 months ago from the latest date in the data
        latest_date = df['Date'].max()
        three_months_ago = latest_date - pd.DateOffset(months=3)
        
        # Filter data for the last 3 months
        recent_data = df[df['Date'] > three_months_ago]
        
        if recent_data.empty:
            return {"error": "No data found for the last 3 months"}
        
        # Group data by month
        recent_data['Month'] = recent_data['Date'].dt.strftime('%Y-%m')
        monthly_data = []
        
        # Calculate monthly stats
        for month, group in recent_data.groupby('Month'):
            debits = group[group['Type'] == 'Debited']['Amount'].sum()
            credits = group[group['Type'] == 'Credited']['Amount'].sum()
            savings = credits - debits
            
            monthly_data.append({
                'month': month,
                'expenses': round(debits, 2),
                'savings': round(savings, 2),
                'income': round(credits, 2)
            })
        
        # Calculate averages
        avg_expenses = sum(m['expenses'] for m in monthly_data) / len(monthly_data)
        avg_savings = sum(m['savings'] for m in monthly_data) / len(monthly_data)
        avg_income = sum(m['income'] for m in monthly_data) / len(monthly_data)
        
        # Store user data
        user_data[user_id] = {
            'monthly_data': monthly_data,
            'averages': {
                'expenses': round(avg_expenses, 2),
                'savings': round(avg_savings, 2),
                'income': round(avg_income, 2)
            },
            'trained_at': datetime.now().isoformat()
        }
        
        return {
            'monthly_data': monthly_data,
            'averages': user_data[user_id]['averages']
        }
        
    except Exception as e:
        return {"error": f"Failed to process CSV file: {str(e)}"}

def generate_insights(user_id, current_expense, current_savings):
    """Generate personalized insights based on historical data and current values"""
    
    # Check if user data exists
    if user_id not in user_data:
        return {"error": "No training data found for this user. Please upload your bank statement first."}
    
    avg_expenses = user_data[user_id]['averages']['expenses']
    avg_savings = user_data[user_id]['averages']['savings']
    
    # Calculate what fraction of the month has passed
    month_fraction = calculate_month_fraction()
    
    # Apply month fraction adjustment to reported values for better comparison
    adjusted_expense_projection = current_expense / month_fraction if month_fraction > 0 else current_expense
    adjusted_savings_projection = current_savings / month_fraction if month_fraction > 0 else current_savings
    
    # Calculate percentage changes
    expense_change_percent = ((adjusted_expense_projection - avg_expenses) / avg_expenses) * 100
    savings_change_percent = ((adjusted_savings_projection - avg_savings) / avg_savings) * 100
    
    # Generate personalized feedback
    feedback = []
    
    # For expenses
    if expense_change_percent > 10:
        feedback.append(f"Warning: Your projected monthly expenses are {abs(round(expense_change_percent))}% higher than your 3-month average. Consider reviewing your spending habits.")
    elif expense_change_percent < -10:
        feedback.append(f"Great job! Your projected monthly expenses are {abs(round(expense_change_percent))}% lower than your 3-month average.")
    else:
        feedback.append("Your expenses are in line with your historical average.")
    
    # For savings
    if savings_change_percent > 10:
        feedback.append(f"Excellent! Your projected monthly savings are {abs(round(savings_change_percent))}% higher than your 3-month average.")
    elif savings_change_percent < -10:
        feedback.append(f"Caution: Your projected monthly savings are {abs(round(savings_change_percent))}% lower than your 3-month average. Consider ways to increase your savings.")
    else:
        feedback.append("Your savings are consistent with your historical pattern.")
    
    # Add extra context about partial month projection
    if month_fraction < 0.9:  # If we're not near the end of the month
        feedback.append(f"Note: These insights are based on projections since you're only {round(month_fraction * 100)}% through the current month. The projections will become more accurate as the month progresses.")
    
    return {
        "historical_average": {
            "expenses": round(avg_expenses, 2),
            "savings": round(avg_savings, 2)
        },
        "current_status": {
            "reported_expenses": round(current_expense, 2),
            "reported_savings": round(current_savings, 2),
            "month_completion": round(month_fraction * 100, 1),
            "projected_expenses": round(adjusted_expense_projection, 2),
            "projected_savings": round(adjusted_savings_projection, 2)
        },
        "comparison": {
            "expense_change_percent": round(expense_change_percent, 1),
            "savings_change_percent": round(savings_change_percent, 1)
        },
        "feedback": feedback
    }

@app.route('/train', methods=['POST'])
def train():
    """
    Upload CSV and extract financial data for training
    Accepts: user_id and CSV file
    """
    # Check if user_id is provided
    if 'user_id' not in request.form:
        return jsonify({"error": "user_id is required"}), 400
    
    user_id = request.form['user_id']
    
    # Check if file is provided
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    
    # Check if filename is empty
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    # Check if file is allowed
    if not allowed_file(file.filename):
        return jsonify({"error": "File must be a CSV"}), 400
    
    try:
        # Save file temporarily
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Process the file
        result = parse_csv_file(file_path, user_id)
        
        # Remove the temporary file
        os.remove(file_path)
        
        if "error" in result:
            return jsonify(result), 400
            
        return jsonify({
            "message": "Financial data processed successfully",
            "data": result
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/insights', methods=['POST'])
def insights():
    """
    Generate insights based on historical data and current values
    Accepts: user_id, current_expense, and current_savings
    """
    try:
        data = request.json
        
        # Validate request
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        required_fields = ['user_id', 'current_expense', 'current_savings']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        user_id = data['user_id']
        current_expense = float(data['current_expense'])
        current_savings = float(data['current_savings'])
        
        # Check if data exists for this user
        if user_id not in user_data:
            today = datetime.now()
            day_of_month = today.day
            
            if day_of_month <= 5:
                return jsonify({
                    "message": "You haven't uploaded your past 3-month data yet. Please upload your bank statement to get insights."
                }), 200
            else:
                return jsonify({"error": "No training data found for this user. Please upload your bank statement first."}), 400
        
        # Generate insights
        result = generate_insights(user_id, current_expense, current_savings)
        
        if "error" in result:
            return jsonify(result), 400
            
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)