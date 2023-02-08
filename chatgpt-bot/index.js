const getOpenAIResponse = require('./chat_ai');
//Creating Discord Bot using OpenAI api
require('dotenv').config();

//Connect to discord api
const { Client, GatewayIntentBits, Events } = require('discord.js');
// Create a new client instance
const client = new Client({
    intents:
      [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent]
  });

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
    organization: process.env.OPENAI_ORG,
});
const openai = new OpenAIApi(configuration);

client.on(Events.MessageCreate, async (message) => {
    try{
        if(message.author.bot) return;
        message.channel.sendTyping();
        const chatGPTResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `ChatGPT Bot is to help.\n\
            ChatGPT: Hello, how are you?\n\
            ${message.author.username}: ${message.content}\n\
            ChatGPT:`,
            temperature: 0.3,
            max_tokens: 100,
            stop: ["ChatGPT:", "SumitKumar:"],
        })
        const answer = chatGPTResponse.data.choices[0].text;
        message.reply(answer);
        return;
    } catch(err) {
        console.log(err)
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is Online on Discord")