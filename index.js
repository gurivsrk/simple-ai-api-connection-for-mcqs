import 'dotenv/config';
import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI();

const mcqSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.INTEGER },
      question: { type: Type.STRING },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            text: { type: Type.STRING }
          },
          required: ["id", "text"]
        }
      },
      answer: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          text: { type: Type.STRING }
        },
        required: ["id", "text"]
      },
      explanation: { type: Type.STRING }
    },
    required: ["id", "question", "options", "answer", "explanation"]
  }
};

const init_time = Date.now();
const response = await ai.models.generateContent({
  model: "gemini-3.5-flash-lite",
  contents: [
    {
      inlineData: {
        mimeType: "application/pdf",
        data: fs.readFileSync("class-10-chapter-10-book-vigyan-bihar-board.pdf").toString("base64")
      }
    },
    { text: "Read the attached PDF chapter and generate 30 MCQs for Bihar Board Class 10 Science based only on its content. Each question must have 4 options with ids 1 to 4. The answer's id and text must exactly match the correct option." }
  ],
  config: {
    responseMimeType: "application/json",
    responseSchema: mcqSchema
  }
});

console.log(response.text);
const end_time = Date.now();
console.log(` ============= Response time: ${((end_time - init_time) / 1000).toFixed(2)} s`);