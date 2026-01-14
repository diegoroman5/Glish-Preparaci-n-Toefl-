import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithGemini = async (prompt: string, history: { role: 'user' | 'model', content: string }[] = []) => {
  const ai = getAI();
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class TOEFL Expert Tutor from Glish. Your goal is to help students become successful Glish Graduates with a focus on their maximum potential and our proprietary Glish Methodology. The course is 100% online with live sessions conducted via Google Meet with real expert coaches. Be professional, encouraging, and highly technical about exam strategies (Speaking, Writing, Reading, Listening). Always provide tips about the 'TOEFL Glish 2026' format which is adaptive and fast-paced.",
    }
  });

  return response.text;
};

export const analyzeStudyImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const imagePart = {
    inlineData: {
      mimeType: 'image/png',
      data: base64Image.split(',')[1] || base64Image,
    },
  };
  const textPart = { text: prompt };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text;
};

export const generateSpeech = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say clearly and professional: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Failed to generate audio");
  return base64Audio;
};

export async function playPCM(base64Audio: string) {
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const audioData = decode(base64Audio);
  const audioBuffer = await decodeAudioData(audioData, audioCtx, 24000, 1);
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start();
}