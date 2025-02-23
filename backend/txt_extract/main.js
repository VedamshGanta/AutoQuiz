const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

async function scrapeAndSave(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Remove unwanted elements
        $('nav, footer, header, aside, script, style').remove();

        // Identify title (use <title>, then <h1>, then fallback to URL)
        let title = $('title').first().text().trim() || $('h1').first().text().trim() || 'scraped_page';

        // Clean up title to make it a safe filename
        title = title.replace(/[<>:"/\\|?*]+/g, '').substring(0, 50); // Remove invalid characters and limit length

        // Extract main content
        let textContent = [];
        $('h1, h2, h3, p, li').each((_, element) => {
            let text = $(element).text().trim();
            if (text.length > 50) textContent.push(text);
        });

        // Format text
        let cleanedText = textContent.join('\n\n');

        if (!cleanedText) {
            console.error('No meaningful content found on the page.');
            return;
        }

        // Define file path using the article title
        const filePath = path.join('C:\\Users\\dijib\\OneDrive\\Documents\\GitHub\\AutoQuiz\\backend\\txt_extract\\scraped text', `${title}.txt`);

        // Save to file
        fs.writeFileSync(filePath, cleanedText);
        console.log(`Scraping complete! Data saved as ${filePath}`);
    } catch (error) {
        console.error('Error scraping the URL:', error.message);
    }
}

// Read URL from link.txt
const linkFilePath = 'C:\\Users\\dijib\\OneDrive\\Documents\\GitHub\\AutoQuiz\\backend\\txt_extract\\link.txt';
fs.readFile(linkFilePath, 'utf-8', (err, url) => {
    if (err) {
        console.error('Error reading link file:', err.message);
        process.exit(1);
    }
    url = url.trim();
    if (!url) {
        console.error('No URL found in link file.');
        process.exit(1);
    }
    scrapeAndSave(url);
});
