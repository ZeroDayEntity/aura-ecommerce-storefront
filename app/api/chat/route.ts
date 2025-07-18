
import { GoogleGenAI, Type } from '@google/genai';
import { getProducts } from '@/lib/products';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const productSchema = {
    type: Type.OBJECT,
    properties: {
        slug: {
            type: Type.STRING,
            description: "A URL-friendly slug for the product, e.g., 'aura-leather-wallet'.",
        },
        name: {
            type: Type.STRING,
            description: "The name of the product.",
        },
    },
};

const schema = {
  type: Type.OBJECT,
  properties: {
    response: {
      type: Type.STRING,
      description: "A helpful and conversational response to the user's query. Address the user directly and be friendly.",
    },
    recommendedProducts: {
      type: Type.ARRAY,
      description: "A list of products that are relevant to the user's query. Only include products that directly answer the user's request.",
      items: productSchema,
    },
  },
  required: ['response', 'recommendedProducts'],
};


export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    if (!process.env.API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const products = getProducts();
    const productData = JSON.stringify(
      products.map(p => ({
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        description: p.description,
      }))
    );
    
    const systemInstruction = `You are the "Aura Concierge," a friendly and expert shopping assistant for Aura, a luxury brand selling minimalist high-end goods. Your personality is sophisticated, helpful, and warm.

    Your task is to answer user questions based ONLY on the provided product data. Do not invent products or details.

    When responding:
    1.  Keep your tone conversational and elegant.
    2.  Directly answer the user's question.
    3.  If you recommend products, mention them by name in your response.
    4.  Your final output must be a JSON object matching the required schema.

    Here is the available product data in JSON format:
    ${productData}`;


    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    });

    return NextResponse.json(JSON.parse(response.text));

  } catch (error) {
    console.error('Error in AI chat route:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
