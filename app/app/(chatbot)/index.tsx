import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GEMKEY } from "@/constants/keys";
import Anthropic from "@anthropic-ai/sdk";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  text: string;
  isUser: boolean;
  data?: any; // optional for storing structured info
}

export default function ChatbotPage() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: t('chatbotWelcome'),
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const primaryColor = "#8B5CF6";

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => [{
      text: t('chatbotWelcome'),
      isUser: false,
    }, ...prev.slice(1)]);
  }, [language]);

  const ai = new Anthropic({
    apiKey: "", // Replace with your actual Anthropic API key
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Define the type for a text content block
      type TextContentBlock = {
        type: "text";
        text: string;
      };

      // Type guard to check if a content block is of type 'text'
      function isTextBlock(block: any): block is TextContentBlock {
        return block.type === "text" && typeof block.text === "string";
      }

      const response = await ai.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
        system: `You are a smart financial assistant. You should respond in ${language === 'en' ? 'English' : language === 'gu' ? 'Gujarati' : language === 'mr' ? 'Marathi' : 'Hindi'} language only.
Extract spending information from this message and respond ONLY with a JSON object in this exact format (no other text). Some fields can be optional. Extract data that you can; if you cannot find that field, return null:
{
  "json": {
    "phoneNumber": "+1234567890",
    "amount": <extract number>,
    "spentCategory": "<extract category>",
    "methodeOfPayment": "<extract payment method or default to 'Cash'>",
    "receiver": "<extract receiver or store name>"
  },
  "message": "<write a friendly confirmation message in ${language === 'en' ? 'English' : language === 'gu' ? 'Gujarati' : language === 'mr' ? 'Marathi' : 'Hindi'} language>"
}`,
      });

      // Extract and concatenate text from all text content blocks
      const assistantMessage = response.content
        .filter(isTextBlock)
        .map((block: any) => block.text)
        .join("");
      let message = JSON.parse(assistantMessage);

      if (message.message === undefined || "") {
        message.message = language === 'en' 
          ? "I'm sorry, I couldn't understand your request."
          : language === 'gu'
          ? "માફ કરશો, હું તમારી વિનંતી સમજી શક્યો નથી."
          : language === 'mr'
          ? "माफ करा, मला तुमची विनंती समजली नाही."
          : "क्षमा करें, मैं आपका अनुरोध समझ नहीं पाया।";
      }

      // Update the messages state with the assistant's response
      setMessages((prev) => [
        ...prev,
        { text: message.message, isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: language === 'en'
            ? "Sorry, I encountered an error. Please try again."
            : language === 'gu'
            ? "માફ કરશો, એક ભૂલ આવી. કૃપા કરી ફરી પ્રયાસ કરો."
            : language === 'mr'
            ? "क्षमस्व, एक त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
            : "क्षमा करें, एक त्रुटि आई। कृपया पुनः प्रयास करें।",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
    >
      <ThemedView style={{ flex: 1 }}>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === "dark" ? "#333333" : "#E5E5E5",
            backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: primaryColor,
            }}
          >
            {t('chatbotTitle')}
          </ThemedText>
        </View>
        <ScrollView
          style={{ flex: 1, padding: 16 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                alignSelf: message.isUser ? "flex-end" : "flex-start",
                backgroundColor: message.isUser
                  ? primaryColor
                  : colorScheme === "dark"
                  ? "#1E1E1E"
                  : "#F3F4F6",
                padding: 12,
                borderRadius: 16,
                maxWidth: "80%",
                marginVertical: 4,
              }}
            >
              <ThemedText
                style={{
                  color:
                    message.isUser || colorScheme === "dark"
                      ? "#FFFFFF"
                      : "#000000",
                }}
              >
                {message.text}
              </ThemedText>
            </View>
          ))}
          {isLoading && (
            <View style={{ padding: 20, alignItems: "center" }}>
              <ActivityIndicator color={primaryColor} />
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            padding: 16,
            paddingBottom: Platform.OS === "ios" ? 30 : 16,
            borderTopWidth: 1,
            borderTopColor: colorScheme === "dark" ? "#333333" : "#E5E5E5",
            backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
          }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={t('chatbotPlaceholder')}
            placeholderTextColor={
              colorScheme === "dark" ? "#666666" : "#999999"
            }
            style={{
              flex: 1,
              marginRight: 8,
              padding: 12,
              borderRadius: 20,
              backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#F3F4F6",
              color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
            }}
          />
          <Pressable
            onPress={handleSend}
            style={{
              backgroundColor: primaryColor,
              padding: 12,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ color: "#FFFFFF" }}>{t('chatbotSend')}</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
