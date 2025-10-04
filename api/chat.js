```js
export default async function handler(req, res) {
  const { question } = req.body;

  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer openaiKey`,
      'Content-Type': 'application/json'
    ,
    body: JSON.stringify(
      model: 'gpt-3.5-turbo',
      messages: [ role: 'user', content: question ]
    )
  );
  const chatData = await chatRes.json();

  const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={geminiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
  });
  const geminiData = await geminiRes.json();

  res.status(200).json({
    chatgpt: chatData.choices?.[0]?.message?.content || 'Error',
    gemini: geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'Error'
  });
}
```
