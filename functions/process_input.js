// functions/process-input.js

const { OpenAI } = require('openai'); // Import OpenAI from 'openai'

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body);
  const userInput = body.userInput; // Assuming `userInput` is a field in your POST request's body

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "You are an intelligent, yet funny, assistant that creates messages with a tiny hint of old fashioned British style. Keep the message concise and short. Maximum one paragraph and integrate a suitable joke in it. The prompt will be given in the following format: sender's name, sender's email, keywords for the message. The receiver of the message shall be Nicolai Austad and the sender's email address must be included in the end if provided." },
        { role: "user", content: userInput }
      ],
      max_tokens: 400,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: response.choices[0].message }), // Updated path to access message
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
