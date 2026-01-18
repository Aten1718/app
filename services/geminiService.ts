
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getDiagnosisFromImage = async (base64Image: string): Promise<DiagnosisResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = "Analisis gambar daun atau buah stroberi ini. Identifikasi apakah ada penyakit, hama, atau defisiensi nutrisi. Berikan hasil dalam format JSON yang mendetail.";

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          description: { type: Type.STRING },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
          preventions: { type: Type.ARRAY, items: { type: Type.STRING } },
          treatments: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["diseaseName", "confidence", "description", "symptoms", "preventions", "treatments"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const chatWithExpert = async (message: string, history: { role: string, content: string }[]) => {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "Anda adalah pakar agronomi spesialis tanaman stroberi. Tugas Anda adalah membantu petani mencegah gagal panen dengan memberikan saran teknis tentang pemupukan, pengendalian hama, pengaturan suhu/kelembaban, dan teknik irigasi. Berikan jawaban yang praktis dan mudah dipahami petani tradisional maupun modern.",
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
