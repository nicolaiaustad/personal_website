// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/process-message', (req, res) => {
    const userMessage = req.body.message;
    // Process the message, for example, send it to the ChatGPT API
    const rewrittenMessage = `Processed: ${userMessage}`; // Placeholder
    res.json({ rewritten_message: rewrittenMessage });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});





const express = require('express');
const axios = require('axios');

app.use(express.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const API_KEY = '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';

app.post('/process-message', async (req, res) => {
    try {
        const response = await axios.post(OPENAI_API_URL, {
            prompt: req.body.message, // Your prompt for the API
            max_tokens: 50
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        res.json({ rewritten_message: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Failed to process message');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

