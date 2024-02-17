import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import Generate from "@/db/models/generate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const idUser = request.headers.get("userId") as string;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {      
      model: 'gpt-3.5-turbo-0125',
      messages: [
        {
          "role": "user",
          "content": body.messages
        }
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      }
    });

    const generatedData = await Generate.createGenerate({
      userId: idUser,
      generate: response.data.choices[0].message.content,
    });

    return NextResponse.json({ text: generatedData.generate });
  } catch (error) {
    console.log(error, "error<<<<<");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
