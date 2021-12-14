const { MessageMentions } = require("discord.js")
const Discord = require('discord.js');

module.exports = {
    name: 'Unmute',
    description: "This command unmutes a user!",
    execute(message, args) {
        if (message.member.roles.cache.has('888512442005602305')) {
            const target = message.mentions.users.first();
            if(target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
                let memberTarget = message.guild.members.cache.get(target.id);
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);

                const unmutedEmbed = new Discord.MessageEmbed()
                .setTitle('Unmute')
                .setThumbnail('https://cdn.discordapp.com/attachments/889412719441227797/889467370488356874/Smiley_Face.png')
                .setFooter('Unmuted ' + memberTarget.user.username + '#' + memberTarget.user.discriminator + ' successfully.')
                .setColor('#OOAAFF');
                message.channel.send(unmutedEmbed);
            } else {
                const failEmbed = new Discord.MessageEmbed().setTitle('Unmute').setFooter('User could not be unmuted.');
                message.channel.send(failEmbed);
            }
        } else {
            message.channel.send("you dont have the permission to execute this command lol");
        }
    }
}