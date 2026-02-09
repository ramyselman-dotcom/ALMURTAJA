
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function connectToSpiritualCompanion(callbacks: any) {
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
      systemInstruction: 'أنت رفيق منصة "المُرتجى" الإيمانية. أنت رفيق روحي هادئ ومثقف، تجيب على أسئلة المستخدم حول القرآن، الأذكار، مواقيت الصلاة، ومعانيها بأسلوب مريح ووقور باللغة العربية الفصحى البسيطة. اجعل إجاباتك قصيرة وملهمة وتساعد المستخدم على الشعور بالسكينة.',
    },
  });
}

export function encodeAudio(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decodeAudio(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}
