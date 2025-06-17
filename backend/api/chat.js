const axios = require('axios');

async function chatWithAI(req, res) {
  try {
    const { message } = req.body;
    const prompt = `Give me answer of this question ${message} also tell the brief about the question `
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    const botReply = response.data.choices[0].message.content;

    return res.json({ reply: botReply });
  } catch (error) {
    console.error("Chatbot error:", error?.response?.data || error.message);
    return res.status(500).json({ error: "Failed to connect to AI" });
  }
}

module.exports = {
  chatWithAI,
};
