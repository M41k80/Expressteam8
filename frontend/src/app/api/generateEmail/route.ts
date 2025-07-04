import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: `Eres un generador de emails de marketing profesional. Devuelve un JSON con:
{
  "subject": "...",
  "body": "..."
}
No devuelvas nada fuera del JSON.`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;
    const parsed = JSON.parse(text);

    return NextResponse.json({
      subject: parsed.subject,
      body: parsed.body
    });
  } catch (error) {
    console.error("Error llamando a OpenRouter:", error);
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    return NextResponse.json({ error: "Error generando email", details: errorMessage }, { status: 500 });
  }
}