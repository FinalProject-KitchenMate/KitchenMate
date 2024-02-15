import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
console.log(body,"prompt>>>>>>>>");

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {      
      model: 'gpt-3.5-turbo',
      messages: [
        {
          "role": "user",
          "content": body.messages
        }
      ] ,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      }
    });    
console.log(response,"response>>>>>>>>");

    return NextResponse.json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.log(error,"error<<<<<");
    
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


