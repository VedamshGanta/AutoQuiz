import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Change to specific origin if needed
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Uses API key from .env
});

// ✅ POST route to generate a quiz
app.post("/api/process", async (req, res) => {
  try {
    const { text } = req.body; // ✅ Extract input text from request body

    if (!text) {
      return res.status(400).json({ error: "Text input is required" });
    }

    // ✅ Request quiz generation from OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "You are a quiz generator that outputs quizzes as raw JSON without formatting.",
        },
        {
          role: "user",
          content: "Create a 5-question multiple-choice quiz about Fred Kent and Project for Public Spaces. Format it as a JSON array where each object has 'question', 'choices', and 'correct_answer' fields. No explanations, no markdown, just raw JSON.", // ✅ Using dynamic user input
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const outputText = response.choices[0].message.content;

    // ✅ Parse JSON output safely
    let quizJson;
    try {
      quizJson = JSON.parse(outputText);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      return res.status(500).json({ error: "Invalid JSON response from AI" });
    }

    // ✅ Structure the response JSON
    const responseData = {
      input: text,
      output: quizJson, // ✅ Now correctly formatted JSON
      timestamp: new Date().toISOString(),
      model: "gpt-3.5-turbo-0125",
    };

    // ✅ Log to terminal
    console.log("\n📚 Generated Quiz:");
    console.log(JSON.stringify(responseData, null, 2));

    // ✅ Respond with structured JSON
    res.json(responseData);
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    res.status(500).json({ error: "Error processing text request" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
