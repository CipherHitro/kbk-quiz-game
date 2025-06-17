const axios = require("axios");
require("dotenv").config();
const generateQuestion = async () => {
  console.log("OpenAI Key : ", process.env.OPENROUTER_API_KEY);
  const prompt = `You are a quiz master AI. Generate 16 *unique* and *non-repeating* multiple-choice trivia questions in this exact JSON format:

[
  {
    "id": <number from 1 to 16>,
    "question": "<dynamic trivia question on random topics like science, history, tech, sports, art, etc.>",
    "options": ["<Option A>", "<Option B>", "<Option C>", "<Option D>"],
    "correctAnswer": <index of correct answer (0-3)>,
    "amount": <prize amount corresponding to this question>
  },
  ...
]

Each question must be *different and not repeated*. Randomly select the topic for each question. Vary the prize amount in this exact sequence (ascending):

[1000, 2000, 3000, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1250000, 2500000, 5000000, 10000000, 70000000]

Only return valid JSON. Do not include any explanations or surrounding text.`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jsonText = response.data.choices[0].message.content;
    console.log(jsonText);

    // Parse JSON safely
    let question;
    try {
      question = JSON.parse(jsonText);
      return question;
    } catch {
      console.log("Error while parsing");
      return false;
    }

    // res.json(question);
  } catch (err) {
    console.error("Error while generating!", err);
    return false;
  }
};
const flipQuestions = async (id, amount, category) => {
  const prompt = `You are a quiz master. Generate a multiple-choice trivia question of category ${category} in this JSON format:

{
  id: ${id},
  question: "<text>",
  options: ["A", "B", "C", "D"],
  correctAnswer: <index of correct answer (0-3)>,
  amount: ${amount}
}

`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jsonText = response.data.choices[0].message.content;

    // Parse JSON safely
    let question;
    // console.log(jsonText);
    try {
      question = JSON.parse(jsonText);
      return question;
    } catch {
      console.log("Error while parsing");
      return false;
    }

    // res.json(question);
  } catch (err) {
    console.error("Error while generating!");
    return false;
  }
};

module.exports = {
  generateQuestion,
  flipQuestions,
};
