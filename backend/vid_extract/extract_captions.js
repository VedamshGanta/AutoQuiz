const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { getSubtitles } = require("youtube-captions-scraper");

// Define file paths
const basePath = "C:\\Users\\dijib\\OneDrive\\Documents\\GitHub\\AutoQuiz\\backend\\vid_extract";
const videoLinkPath = path.join(basePath, "videolink.txt");
const scriptsFolderPath = path.join(basePath, "scripts");

// Ensure the scripts directory exists
if (!fs.existsSync(scriptsFolderPath)) {
    fs.mkdirSync(scriptsFolderPath, { recursive: true });
}

// Function to extract video ID from a YouTube URL
function extractVideoId(url) {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|watch\?v=)([^&\n?#]+)/);
    return match ? match[1] : null;
}

// Function to sanitize strings for filenames
function sanitizeFileName(name) {
    return name.replace(/[<>:"/\\|?*]+/g, '').replace(/\s+/g, '_').substring(0, 100); // Limits length to 100 chars
}

// Function to fetch video metadata (title + channel name)
async function fetchVideoMetadata(videoId) {
    try {
        const response = await axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        return {
            title: response.data.title,
            channel: response.data.author_name
        };
    } catch (error) {
        console.error("Error fetching video metadata:", error.message);
        return { title: "Untitled", channel: "Unknown_Channel" };
    }
}

// Function to scrape captions and save them
async function processVideo() {
    try {
        console.log("Reading video link from videolink.txt...");
        
        // Read video URL from file
        const videoUrl = fs.readFileSync(videoLinkPath, "utf8").trim();
        if (!videoUrl) {
            console.error("No video URL found in videolink.txt");
            return;
        }

        console.log(`Extracted video URL: ${videoUrl}`);

        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            console.error("Invalid YouTube link in videolink.txt");
            return;
        }

        console.log(`Extracting captions for Video ID: ${videoId}`);

        // Fetch video metadata
        const { title, channel } = await fetchVideoMetadata(videoId);
        const sanitizedFileName = sanitizeFileName(`${title}_${channel}_script.txt`);

        // Fetch captions
        const captions = await getSubtitles({ videoID: videoId, lang: "en" });
        if (captions.length === 0) {
            console.error("No captions found for this video.");
            return;
        }

        console.log("Captions successfully fetched.");

        // Convert captions to text
        const scriptText = captions.map(caption => caption.text).join(" ");

        // Define full file path
        const scriptFilePath = path.join(scriptsFolderPath, sanitizedFileName);

        // Save captions to file
        fs.writeFileSync(scriptFilePath, scriptText, "utf8");

        console.log(`Captions saved to: ${scriptFilePath}`);
    } catch (error) {
        console.error("Error extracting captions:", error);
    } finally {
        console.log("Script execution finished.");
    }
}

// Automatically run the script
processVideo();
