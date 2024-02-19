// functions/process-input.js

// Example of a Netlify serverless function using OpenAI
// const { Configuration, OpenAIApi } = require('openai');
const { OpenAIApi } = require('openai');
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const openai = new OpenAIApi(new Configuration({
      apiKey: "OPEN_AI_KEY",
    }));

    const response = await openai.ChatCompletion.create({
      messages: [{ role: "system", content: "You are an intelligent, yet funny, assistant that creates messages with a tiny hint of old fashioned British style. Keep the message concise and short. Maxiumum one paragraph and integrate a suitable joke in it. The prompt will be given in the following format: sender's name, sender's email, keywords for the message. The receiver of the message shall be Nicolai Austad and the sender's email addresse must be included in the end if provided. "},
                        { role: "user", content: userInput}],
            model: "gpt-3.5-turbo-0613",
            max_tokens: 400,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: response.data.choices[0].text }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};


// const {OpenAIApi} = require('openai');
// import OpenAI from "openai";

// const openai = new OpenAI();

// exports.handler = async (event) => {
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: "Method Not Allowed" };
//   }

//   const body = JSON.parse(event.body);
//   const { userInput } = body;



//   // const openai = new OpenAIApi(configuration);
  
//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `You are an intelligent, yet funny, assistant that creates messages with a tiny hint of old fashioned British style. Keep the message concise and short. Maximum one paragraph and integrate a suitable joke in it. The prompt will be given in the following format: sender's name, sender's email, keywords for the message. The receiver of the message shall be Nicolai Austad and the sender's email address must be included in the end if provided. \n\n${userInput}`,
//       max_tokens: 400,
//     });

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ response: completion.data.choices[0].text }),
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Failed to process input with OpenAI" }),
//     };
//   }
// };
