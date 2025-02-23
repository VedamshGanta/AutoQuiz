const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store API key in .env file for security
});

async function generateQuiz(text) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful quiz generator." },
        { role: "user", content: `Generate a quiz based on the following text:\n\n${text}` },
      ],
      model: "gpt-3.5-turbo",  // or latest available model
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz");
  }
}

module.exports = generateQuiz;
