const { MessageMentions } = require("discord.js")
const Discord = require('discord.js');

module.exports = {
    name: 'Mute',
    description: "This command mutes a user!",
    execute(message, args) {
        if (message.member.roles.cache.has('888512442005602305')) {
            const target = message.mentions.users.first();
            if (target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
                let memberTarget = message.guild.members.cache.get(target.id);
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);

                const mutedEmbed = new Discord.MessageEmbed()
                .setTitle('Mute')
                .setThumbnail('https://cdn.discordapp.com/attachments/889412719441227797/889467370488356874/Smiley_Face.png')
                .setFooter('Muted ' + memberTarget.user.username + '#' + memberTarget.user.discriminator + ' successfully.')
                .setColor('#OOAAFF');
                message.channel.send(mutedEmbed);
            } else {
                const failEmbed = new Discord.MessageEmbed().setTitle('Mute').setFooter('User could not be muted.');
                message.channel.send(failEmbed);
            }
        } else {
            message.channel.send("you dont have permission to execute that command lol");
        }
    }
}