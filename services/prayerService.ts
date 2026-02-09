
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  city: string;
}

export async function fetchPrayerTimes(lat: number, lng: number): Promise<PrayerTimes> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Find the precise Islamic prayer times for today at coordinates (Latitude: ${lat}, Longitude: ${lng}). Return ONLY a JSON object.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fajr: { type: Type.STRING },
          sunrise: { type: Type.STRING },
          dhuhr: { type: Type.STRING },
          asr: { type: Type.STRING },
          maghrib: { type: Type.STRING },
          isha: { type: Type.STRING },
          city: { type: Type.STRING }
        },
        required: ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha", "city"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    throw new Error("Failed to parse prayer times");
  }
}
