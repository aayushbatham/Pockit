import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
import numpy as np
import re
from typing import Dict, Optional

class TransactionClassifier(nn.Module):
    def __init__(self, bert_model: str = 'bert-base-uncased'):
        super().__init__()
        self.bert = BertModel.from_pretrained(bert_model)
        self.dropout = nn.Dropout(0.1)
        self.fc_transaction = nn.Linear(768, 2)  # Transaction type (sent/received)
        self.fc_amount = nn.Linear(768, 1)       # Amount detection

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs[1]
        pooled_output = self.dropout(pooled_output)
        
        transaction_type = torch.softmax(self.fc_transaction(pooled_output), dim=1)
        amount_presence = torch.sigmoid(self.fc_amount(pooled_output))
        
        return transaction_type, amount_presence

class SMSClassifier:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = TransactionClassifier().to(self.device)
        self.amount_pattern = r'(?:RS|INR|₹)\s*\.?\s*(\d+(?:,\d+)?(?:\.\d{1,2})?)'
        
    def load_model(self, path: str = 'model/weights/model.pth'):
        try:
            self.model.load_state_dict(torch.load(path, map_location=self.device))
            self.model.eval()
        except Exception as e:
            print(f"Error loading model: {e}")
            
    def extract_amount(self, text: str) -> Optional[float]:
        match = re.search(self.amount_pattern, text, re.IGNORECASE)
        if match:
            amount_str = match.group(1).replace(',', '')
            return float(amount_str)
        return None
        
    def predict(self, text: str) -> Dict:
        # Tokenize text
        encoded = self.tokenizer.encode_plus(
            text,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        ).to(self.device)
        
        with torch.no_grad():
            transaction_type, amount_presence = self.model(
                encoded['input_ids'],
                encoded['attention_mask']
            )
        
        # Get prediction results
        trans_type = 'received' if transaction_type[0][0] > transaction_type[0][1] else 'sent'
        amount = self.extract_amount(text)
        
        return {
            'type': trans_type,
            'amount': amount,
            'confidence': float(torch.max(transaction_type[0]).item())
        } 