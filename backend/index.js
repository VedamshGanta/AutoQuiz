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

// ✅ POST route to process text via GPT-3.5-Turbo
app.post("/api/process", async (req, res) => {
  try {
    const { text } = req.body; // Get text input from request body

    if (!text) {
      return res.status(400).json({ error: "Text input is required" });
    }

    // ✅ Send the text to GPT-3.5-Turbo
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      max_tokens: 200,
    });

    const outputText = response.choices[0].message.content;

    res.json({ output: outputText });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Error processing text request" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
