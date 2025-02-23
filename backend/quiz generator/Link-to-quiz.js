const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');

const filePath = path.join(
    'C:\\Users\\dijib\\OneDrive\\Documents\\GitHub\\AutoQuiz\\backend\\quiz generator',
    'link.txt'
);

const apiKeyPath = path.join("C:\\Users\\dijib\\OneDrive\\Documents\\GitHub\\AutoQuiz\\backend\\quiz generator\\apikey.txt");

let apiKey;
try {
    apiKey = fs.readFileSync(apiKeyPath, 'utf-8').trim();
} catch (error) {
    console.error("Error reading API key:", error.message);
    process.exit(1);
}

function extractJson(responseText) {
    try {
        const cleanedText = responseText.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Failed to parse JSON:", error.message);
        console.error("Response received:", responseText);
        process.exit(1);
    }
}

async function generateQuizQuestions() {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo-0125",
                messages: [
                    { role: "system", content: "You are a quiz generator that outputs quizzes as raw JSON without formatting." },
                    { role: "user", content: "Create a 5-question multiple-choice quiz about Fred Kent and Project for Public Spaces. Format it as a JSON array where each object has 'question', 'choices', and 'correct_answer' fields. No explanations, no markdown, just raw JSON." }
                ],
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = response.data.choices[0].message.content;
        const quizQuestions = extractJson(data);

        const outputDir = path.join(__dirname, 'quiz_jsons');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputFilePath = path.join(outputDir, 'Fred_Kent_Quiz.json');
        fs.writeFileSync(outputFilePath, JSON.stringify(quizQuestions, null, 2), 'utf-8');
        console.log(`Quiz generated and saved to: ${outputFilePath}`);
    } catch (error) {
        console.error("Error generating quiz questions:", error.response ? error.response.data : error.message);
    }
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    const link = data.trim();
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;

    if (youtubeRegex.test(link)) {
        console.log('YouTube link detected. Running video_extractions.js...');
        exec(`node "${path.join(__dirname, 'video_extractions.js')}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Script error: ${stderr}`);
                return;
            }
            console.log(`Script output: ${stdout}`);
        });
    } else {
        console.log('Non-YouTube link detected. Running webpage_extraction.js...');
        exec(`node "${path.join(__dirname, 'webpage_extraction.js')}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Script error: ${stderr}`);
                return;
            }
            console.log(`Script output: ${stdout}`);
        });
    }

    generateQuizQuestions();
});