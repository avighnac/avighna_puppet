const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: 'Mock',
    description: "mOcKs TeXt",
    execute(message, args) {
        let str = message.content.substr(6, message.content.length).toUpperCase();

        for (let i = 1; i < str.length; i+=2) {
            answer += str.charAt(i).toLowerCase();
        }

        const answerEmbed = new Discord.MessageEmbed().setTitle('Mock').setFooter(answer);
        message.channel.send(answerEmbed);
    }
}
