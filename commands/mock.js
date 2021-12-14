const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: 'Mock',
    description: "mOcKs TeXt",
    execute(message, args) {
        let str = message.content.substr(6, message.content.length);
        let answer = "";
        let shuffle = true;

        for (let i = 0; i < str.length; i++) {
            if (shuffle) answer += str.substr(i, 1).toLowerCase();
            else answer += str.substr(i, 1).toUpperCase();
            shuffle = !shuffle;
        }

        const answerEmbed = new Discord.MessageEmbed().setTitle('Mock').setFooter(answer);
        message.channel.send(answerEmbed);
    }
}