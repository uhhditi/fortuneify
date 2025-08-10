import { NextResponse, NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!,});

export async function POST(req: Request) {
    const {songs} = await req.json();
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: songs,
            config: {
                systemInstruction: "Provide a concise, one-sentence fortune or prediction for the upcoming future based on playlist contents with sign(s) to look for",
                temperature: 1.0,
              },
          });
          return NextResponse.json({
            success: true,
            text: response.text,
          });
        } catch (error) {
          console.error('Gemini API error:', error);
          return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
          );
        }
      }