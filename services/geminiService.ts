
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getZikrReflection(zikrText: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك عالماً روحياً ومحفزاً، قدم شرحاً موجزاً وملهماً لهذا الذكر في فقرة واحدة قصيرة باللغة العربية. ركز على الأثر النفسي والروحي له: "${zikrText}"`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });
    return response.text || "لا يتوفر تأمل لهذا الذكر حالياً.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ أثناء جلب التأمل. حاول مرة أخرى لاحقاً.";
  }
}

export async function getDailyInspiration(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "قدم نصيحة روحية قصيرة وملهمة لليوم، باللغة العربية، تبدأ بـ 'تذكر اليوم أن...'",
      config: {
        temperature: 0.8,
        maxOutputTokens: 150,
      }
    });
    return response.text || "تذكر اليوم أن ذكر الله طمأنينة للقلب.";
  } catch (error) {
    return "تذكر اليوم أن ذكر الله طمأنينة للقلب.";
  }
}
