#!/bin/bash

# Create a sample CSV for testing
cat > sample_transactions.csv << EOL
Date,Description,Amount,Type,Category
2025-02-15,Grocery Shopping,120.50,Debit,Food
2025-02-20,Restaurant,45.75,Debit,Food
2025-02-25,Salary Deposit,3000.00,Credit,Income
2025-03-05,Rent Payment,1200.00,Debit,Housing
2025-03-10,Phone Bill,60.00,Debit,Utilities
2025-03-15,Grocery Shopping,135.20,Debit,Food
2025-03-20,Gas Station,40.00,Debit,Transportation
2025-03-25,Salary Deposit,3000.00,Credit,Income
2025-04-05,Rent Payment,1200.00,Debit,Housing
2025-04-10,Electric Bill,85.30,Debit,Utilities
2025-04-15,Grocery Shopping,115.80,Debit,Food
2025-04-20,Movie Theater,25.00,Debit,Entertainment
2025-04-25,Salary Deposit,3000.00,Credit,Income
EOL

echo "Sample CSV file created: sample_transactions.csv"

# Test the /train endpoint using curl
echo -e "\nTesting /train endpoint..."
curl -X POST -F "user_id=user123" -F "file=@sample_transactions.csv" http://localhost:5000/train

# Test the /insights endpoint using curl
echo -e "\n\nTesting /insights endpoint..."
curl -X POST -H "Content-Type: application/json" \
  -d '{"user_id":"user123", "current_expense":2800, "current_savings":200}' \
  http://localhost:5000/insights

echo -e "\n\nTests completed."