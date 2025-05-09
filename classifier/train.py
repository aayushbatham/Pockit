import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from model.sms_classifier import TransactionClassifier
from preprocessing.text_processor import TextProcessor
import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer
import numpy as np

class SMSDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=128):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len
        
    def __len__(self):
        return len(self.texts)
        
    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        
        encoding = self.tokenizer.encode_plus(
            text,
            max_length=self.max_len,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

def train_model(train_data: pd.DataFrame, epochs: int = 10):
    # Initialize tokenizer and model
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = TransactionClassifier()
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    
    # Prepare data
    X_train, X_val, y_train, y_val = train_test_split(
        train_data['text'],
        train_data['label'],
        test_size=0.2
    )
    
    train_dataset = SMSDataset(X_train.values, y_train.values, tokenizer)
    val_dataset = SMSDataset(X_val.values, y_val.values, tokenizer)
    
    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=16)
    
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    criterion = nn.CrossEntropyLoss()
    
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        
        for batch in train_loader:
            optimizer.zero_grad()
            
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            transaction_type, _ = model(input_ids, attention_mask)
            loss = criterion(transaction_type, labels)
            
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item()
            
        model.eval()
        val_loss = 0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for batch in val_loader:
                input_ids = batch['input_ids'].to(device)
                attention_mask = batch['attention_mask'].to(device)
                labels = batch['labels'].to(device)
                
                transaction_type, _ = model(input_ids, attention_mask)
                loss = criterion(transaction_type, labels)
                
                val_loss += loss.item()
                
                _, predicted = torch.max(transaction_type, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
        
        print(f'Epoch {epoch+1}:')
        print(f'Training Loss: {total_loss/len(train_loader):.4f}')
        print(f'Validation Loss: {val_loss/len(val_loader):.4f}')
        print(f'Validation Accuracy: {100 * correct/total:.2f}%\n')
    
    torch.save(model.state_dict(), 'model/weights/model.pth')

if __name__ == '__main__':
    train_data = pd.read_csv('data/training_data.csv')
    train_model(train_data) 