interface Translation {
    [key: string]: {
        [key: string]: string;
    };
}

export const translations: Translation = {
    en: {
        home: "Home",
        profile: "Profile",
        settings: "Settings",
        language: "Language",
        editProfile: "Edit Profile",
        spendingPersonality: "Spending Personality",
        moneyGoals: "Money Goals",
        smsAccess: "SMS Access",
        upiSync: "UPI Sync",
        insights: "Lakshya Insights",
        addTransaction: "Add Transaction",
        cancel: "Cancel",
        add: "Add",
        adding: "Adding...",
        success: "Transaction Added Successfully"
    },
    gu: {
        home: "ઘર",
        profile: "પ્રોફાઇલ",
        settings: "સેટિંગ્સ",
        language: "ભાષા",
        editProfile: "પ્રોફાઇલ સંપાદિત કરો",
        spendingPersonality: "ખર્ચ વ્યક્તિત્વ",
        moneyGoals: "નાણાકીય લક્ષ્યો",
        smsAccess: "SMS ઍક્સેસ",
        upiSync: "UPI સિંક",
        insights: "લક્ષ્ય અંતર્દૃષ્ટિ",
        addTransaction: "વ્યવહાર ઉમેરો",
        cancel: "રદ કરો",
        add: "ઉમેરો",
        adding: "ઉમેરી રહ્યા છીએ...",
        success: "વ્યવહાર સફળતાપૂર્વક ઉમેરાયો"
    },
    mr: {
        home: "मुख्यपृष्ठ",
        profile: "प्रोफाइल",
        settings: "सेटिंग्ज",
        language: "भाषा",
        editProfile: "प्रोफाइल संपादित करा",
        spendingPersonality: "खर्च व्यक्तिमत्व",
        moneyGoals: "आर्थिक लक्ष्ये",
        smsAccess: "SMS प्रवेश",
        upiSync: "UPI सिंक",
        insights: "लक्ष्य अंतर्दृष्टी",
        addTransaction: "व्यवहार जोडा",
        cancel: "रद्द करा",
        add: "जोडा",
        adding: "जोडत आहे...",
        success: "व्यवहार यशस्वीरित्या जोडला"
    },
    hi: {
        home: "होम",
        profile: "प्रोफाइल",
        settings: "सेटिंग्स",
        language: "भाषा",
        editProfile: "प्रोफाइल संपादित करें",
        spendingPersonality: "खर्च करने की आदत",
        moneyGoals: "धन के लक्ष्य",
        smsAccess: "एसएमएस एक्सेस",
        upiSync: "यूपीआई सिंक",
        insights: "लक्ष्य अंतर्दृष्टि",
        addTransaction: "लेन-देन जोड़ें",
        cancel: "रद्द करें",
        add: "जोड़ें",
        adding: "जोड़ रहे हैं...",
        success: "लेन-देन सफलतापूर्वक जोड़ा गया"
    }
};

export type Language = "en" | "gu" | "mr" | "hi";