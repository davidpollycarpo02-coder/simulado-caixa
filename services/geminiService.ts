import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question, Subject } from '../types';

// Declaração para evitar erro de 'process is not defined' no TypeScript/Vite
declare var process: {
  env: {
    API_KEY?: string;
    [key: string]: string | undefined;
  }
};

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// O 'define' no vite.config.ts garante que process.env exista (mesmo que vazio) para não quebrar o app.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIExplanation = async (question: Question, selectedOptionId: string | null): Promise<string> => {
  if (!process.env.API_KEY) return "Funcionalidade de IA indisponível. Chave de API não configurada (Simulado Offline Ativo).";

  const prompt = `
    Você é um tutor especialista em concursos bancários (Caixa Econômica Federal).
    
    A questão é: "${question.text}"
    Alternativas:
    ${question.options.map(o => `${o.id}) ${o.text}`).join('\n')}
    
    A alternativa correta é: ${question.correctOptionId}.
    O aluno marcou: ${selectedOptionId || "Não respondeu"}.
    
    Por favor, explique didaticamente:
    1. Por que a alternativa correta é a correta.
    2. Por que a alternativa marcada pelo aluno está incorreta (se ele errou).
    3. Dê uma dica mnemônica ou prática para lembrar deste conceito.
    Seja conciso, direto e motivador.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a explicação.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o tutor IA. Tente novamente.";
  }
};

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    text: { type: Type.STRING, description: "O enunciado da questão." },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING },
        },
        required: ["id", "text"]
      }
    },
    correctOptionId: { type: Type.STRING, description: "O ID da alternativa correta (a, b, c, d, ou e)." },
    explanation: { type: Type.STRING, description: "Uma explicação detalhada da resposta." },
    subject: { type: Type.STRING, description: "A matéria da questão." }
  },
  required: ["text", "options", "correctOptionId", "explanation", "subject"]
};

export const generateQuestionBySubject = async (subject: Subject): Promise<Question | null> => {
  if (!process.env.API_KEY) return null;

  const prompt = `Crie uma questão de múltipla escolha inédita, nível difícil, estilo Cesgranrio, para o concurso da Caixa Econômica Federal 2026.
  Matéria: ${subject}.
  A questão deve ter 5 alternativas (a, b, c, d, e).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        temperature: 0.7
      }
    });

    const rawJSON = response.text;
    if (!rawJSON) return null;

    const data = JSON.parse(rawJSON);
    
    return {
      id: `ai-${Date.now()}`,
      subject: subject,
      notebookId: '4',
      text: data.text,
      options: data.options,
      correctOptionId: data.correctOptionId,
      explanation: data.explanation,
      isAiGenerated: true
    };
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return null;
  }
};