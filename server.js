// // server.js

// const OpenAI = require('openai').default;
// const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// main();

// // const OpenAI = require('openai').default;
// // const openai = new OpenAI();
// // const express = require('express');
// // require('dotenv').config();
// // const bodyParser = require('body-parser');
// // const app = express();
// // // const openai = new OpenAI(process.env.OPENAI_API_KEY);
// // app.use(bodyParser.json());

// // async function main() {

// //     app.post('/process-input', async (req, res) => {
// //         console.log(req.body); // Example: Log the request body to the console
// //         res.json({ message: 'Received' });
// //         const { userInput } = req.body;

// //         try {
// //         const completion = await openai.chat.completions.create({
// //             messages: [{ role: "user", content: userInput }],
// //             model: "gpt-3.5-turbo",
// //         });

// //         res.json({ response: completion.choices[0].message.content });
// //         } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: 'Failed to process input' });
// //         }
// //     });
            
// // //         const completion = await openai.chat.completions.create({
// // //             messages: [{ role: "system", content: "You are a helpful assistant." }],
// // //             model: "gpt-3.5-turbo",
// // //   });

// //   console.log(completion.choices[0]);
// //   const port = 5500;
// //     app.listen(port, () => {
// //     console.log(`Server running at http://localhost:${port}`);})
// // }

// // main();



// server.js


const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const OpenAI = require('openai').default;
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(bodyParser.json());
app.use(cors()); // Enable CORS





app.post('/process-input', async (req, res) => {
    console.log(req.body); // Log the request body to the console
    const { userInput } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are an intelligent, yet funny, assistant that creates messages with a tiny hint of old fashioned British style. Keep the message concise and short. Maxiumum one paragraph and integrate a suitable joke in it. The prompt will be given in the following format: sender's name, sender's email, keywords for the message. The receiver of the message shall be Nicolai Austad and the sender's email addresse must be included in the end if provided. "},
                        { role: "user", content: userInput}],
            model: "gpt-3.5-turbo-0613",
            max_tokens: 400,
        });

        // Send back the response from ChatGPT to the client
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process input' });
    }
});



// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});


// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const {gptOutput_id} = req.body; // Replace 'userInput' with your input field name
    
    console.log(gptOutput_id);

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to: 'nicolaiaustad@gmail.com', // Receiver
        subject: 'Message from Website Visitor', // Email subject
        text: gptOutput_id, // Email body from form input
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Message sent successfully');
        }
    });
});


const port = 5506;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

