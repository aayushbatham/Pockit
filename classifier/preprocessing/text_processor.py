import re
from typing import List

class TextProcessor:
    def __init__(self):
        self.banking_keywords = [
            'credited', 'debited', 'transferred', 'paid', 'received',
            'transaction', 'account', 'balance', 'payment', 'upi'
        ]
    
    def preprocess(self, text: str) -> str:
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters but keep currency symbols
        text = re.sub(r'[^\w\s₹.]', '', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    def is_transaction_sms(self, text: str) -> bool:
        text = text.lower()
        return any(keyword in text for keyword in self.banking_keywords) 