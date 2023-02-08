const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
    organization: process.env.OPENAI_ORG,
});
const openai = new OpenAIApi(configuration);

const getOpenAIResponse = (userInput) => {
    return new Promise((resolve, reject) => {
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: `ChatGPT Bot is to help.\n\
            ChatGPT: Hello, how are you?\n\
            ${userInput.author.username}: ${userInput.content}\n\
            ChatGPT:`,
            temperature: 0.3,
            max_tokens: 100,
            stop: ["ChatGPT:", "SumitKumar:"],
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

// const getOpenAIResponse = async (userInput) => {
//     const chatGPTResponse = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: `ChatGPT Bot is to help.\n\
//         ChatGPT: Hello, how are you?\n\
//         ${userInput.author.username}: ${userInput.content}\n\
//         ChatGPT:`,
//         temperature: 0.3,
//         max_tokens: 100,
//         stop: ["ChatGPT:", "SumitKumar:"],
//     })
//     const answer = response.data.choices[0].text;
//     console.log(answer);
//     return answer;
// }

//Export the "ask" function
module.exports = getOpenAIResponse;