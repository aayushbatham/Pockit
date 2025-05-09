from flask import Flask, request, jsonify
from model.sms_classifier import SMSClassifier
from preprocessing.text_processor import TextProcessor

app = Flask(__name__)
classifier = SMSClassifier()
processor = TextProcessor()

@app.route('/analyze', methods=['POST'])
def analyze_sms():
    try:
        data = request.json
        sms_text = data.get('sms')
        
        if not sms_text:
            return jsonify({'error': 'No SMS text provided'}), 400
            
        # Preprocess the SMS
        processed_text = processor.preprocess(sms_text)
        
        # Analyze the SMS
        result = classifier.predict(processed_text)
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    classifier.load_model()
    app.run(host='0.0.0.0', port=5000)
