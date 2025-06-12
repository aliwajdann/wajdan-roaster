export const runtime = 'edge';

export async function POST(request:Request) {
  const { name } = await request.json();

  if (!name) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: "Roast the user's name in 1-3 funny lines. In Roman Urdu language"
          },
          {
            role: "user",
            content: `Roast this name: ${name}`
          }
        ],
        max_tokens: 100,
        temperature: 0.9
      })
    });

    const data = await response.json();
    const roast = data.choices[0]?.message?.content;
    return Response.json({ roast });
    
  } catch (error) {
    console.error("OpenAI Error:", error);
    return Response.json(
      { error: "Roast failed. Try again later!" },
      { status: 500 }
    );
  }
}