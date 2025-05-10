import React, { useState } from "react";
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
import { GoogleGenAI } from "@google/genai";
import { GEMKEY } from "@/constants/keys";
import { useColorScheme } from "@/hooks/useColorScheme";

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your financial assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const primaryColor = "#8B5CF6";

  const ai = new GoogleGenAI({ apiKey: GEMKEY });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: input,
      });

      const aiMessage = { text: response.text, isUser: false };
      setMessages((prev) => [
        ...prev,
        { text: response.text || "", isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
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
            justifyContent: "center"
          }}
        >
          <ThemedText 
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: primaryColor
            }}
          >
            Chatbot
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
            placeholder="Ask about your finances..."
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
            <ThemedText style={{ color: "#FFFFFF" }}>Send</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
