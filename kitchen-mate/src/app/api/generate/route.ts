import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import Generate from "@/db/models/generate";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const idUser = request.headers.get("userId") as string;

//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-3.5-turbo-0125',
//       messages: [
//         {
//           "role": "user",
//           "content": body.messages
//         }
//       ],
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//       }
//     });

//     console.log(response.data.text, "response.data.text");
//     const generatedData = await Generate.createGenerate({
//       userId: idUser,
//       generate: JSON.parse(response.data.choices[0].message.content),

//     });

//     return NextResponse.json({ text: generatedData.generate });
//   } catch (error) {
//     console.log(error, "error<<<<<");
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const idUser = request.headers.get("userId") as string;
    // console.log(idUser, "idUser<<<<<");
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "user",
            content: body.messages,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const responseData = response.data;
    if (
      !responseData ||
      !responseData.choices ||
      !responseData.choices.length
    ) {
      throw new Error("Invalid response from OpenAI");
    }

    const recipeData = JSON.parse(responseData.choices[0].message.content);

    const generatedData = await Generate.createGenerate({
      userId: idUser,
      generate: {
        title: recipeData.title,
        image: recipeData.image,
        summary: recipeData.summary,
        readyInMinutes: recipeData.readyInMinutes,
        servings: recipeData.servings,
        cuisines: recipeData.cuisines,
        analysisInstructions: recipeData.analysisInstructions,
        extendIngredients: recipeData.extendIngredients,
      },
      title: recipeData.title,
      image: recipeData.image,
      summary: recipeData.summary,
      readyInMinutes: recipeData.readyInMinutes,
      servings: recipeData.servings,
      cuisines: recipeData.cuisines,
      analysisInstructions: recipeData.analysisInstructions,
      extendIngredients: recipeData.extendIngredients,
    });
    // console.log(generatedData, 'generating');
    return NextResponse.json({ text: generatedData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
