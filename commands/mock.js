const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: 'Mock',
    description: "mOcKs TeXt",
    execute(message, args) {
        let str = message.content.substr(6, message.content.length);
        let answer = "";

        for (let i = 0; i < str.length; i++) {
            answer += str.charAt(i)[i % 2 ? 'toUpperCase' : 'toLowerCase']();
        }

        const answerEmbed = new Discord.MessageEmbed().setTitle('Mock').setFooter(answer);
        message.channel.send(answerEmbed);
    }
}
