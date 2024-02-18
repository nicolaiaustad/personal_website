// functions/process-input.js
// const { Configuration, OpenAIApi } = require("openai");
const OpenAIApi = require('openai').default;


exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);
  const { userInput } = body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are an intelligent, yet funny, assistant that creates messages with a tiny hint of old fashioned British style. Keep the message concise and short. Maximum one paragraph and integrate a suitable joke in it. The prompt will be given in the following format: sender's name, sender's email, keywords for the message. The receiver of the message shall be Nicolai Austad and the sender's email address must be included in the end if provided. \n\n${userInput}`,
      max_tokens: 400,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ response: completion.data.choices[0].text }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process input with OpenAI" }),
    };
  }
};
