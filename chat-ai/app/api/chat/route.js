export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch("https://api.akbxr.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AKBXR_API_KEY || "UNLIMITED-BETA"}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "auto",
      messages,
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
