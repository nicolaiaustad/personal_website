// functions/process-input.js
// const {OpenAIApi } = require("openai");



const {OpenAIApi} = require('openai');


exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);
  const { userInput } = body;


  const openAiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-curie-001',
      prompt: myPrompt,
      temperature: 1,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    }),
  };


  // const openai = new OpenAIApi(configuration);
  try {
    const response = await fetch(
      '<https://api.openai.com/v1/completions>',
      openAiConfig,
    );
    const data = await response.json();
    return {
      statusCode: 200,
      body: data.choices[0].text,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: `error occured: ${error}`,
    };
  }
  // try {
  //   const completion = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: `You are an intelligent, yet funny, assistant that creates messages with a tiny hint of old fashioned British style. Keep the message concise and short. Maximum one paragraph and integrate a suitable joke in it. The prompt will be given in the following format: sender's name, sender's email, keywords for the message. The receiver of the message shall be Nicolai Austad and the sender's email address must be included in the end if provided. \n\n${userInput}`,
  //     max_tokens: 400,
  //   });

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ response: completion.data.choices[0].text }),
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ error: "Failed to process input with OpenAI" }),
  //   };
  // }
};










// import fetch from 'isomorphic-fetch';

// export async function handler(event) {
//   let myInput = undefined;
//   try {
//     console.log(event.body);
//     myInput = JSON.parse(event.body).input;
//     // rest of the code
//   } catch (error) {
//     console.error('Error parsing JSON input:', error);
//     return {
//       statusCode: 400,
//       body: `Error: ${error}, req body: ${event.body.input}, myInput: ${myInput}`,
//     };
//   }

//   const myPrompt = `Understand the Emotion based on the Input and provide a helpful stoic Quote from a philosopher of any time.\\n\\nInput: \\"${myInput}\\"\\nQuote:`;

//   // The configuration for the API request to OpenAI
//   const openAiConfig = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: 'text-curie-001',
//       prompt: myPrompt,
//       temperature: 1,
//       max_tokens: 100,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0,
//     }),
//   };

//   try {
//     const response = await fetch(
//       '<https://api.openai.com/v1/completions>',
//       openAiConfig,
//     );
//     const data = await response.json();
//     return {
//       statusCode: 200,
//       body: data.choices[0].text,
//     };
//   } catch (error) {
//     console.error('Error:', error);
//     return {
//       statusCode: 500,
//       body: `error occured: ${error}`,
//     };
//   }
// }