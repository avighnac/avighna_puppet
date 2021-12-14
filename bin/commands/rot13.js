var { exec, spawn } = require('child_process');
const Discord = require('discord.js');

module.exports = {
    name: 'Rot13',
    description: "ROT13 is a shift cipher, that’s a simple kind of encryption where the ciphertext is created by taking the plain text message and shifting (moving forward in the alphabet) by a certain number of letters. The name is a shorthand version of ‘rotation 13’. ",
    execute(message, args){
        exec('chmod +x commands/scripts/rot13.out');
        console.log('[EXECUTE] commands/scripts/rot13.out \"' + message.content.substr(7, message.content.length) + "\"");
        exec('commands/scripts/rot13.out \"' + message.content.substr(7, message.content.length) + "\"", function (err, stdout, stderr) {
            if (err) console.error(stderr);
            const embed = new Discord.MessageEmbed().setTitle('Rot13').setFooter("\"" + message.content.substr(7, message.content.length) + "\" in ROT13 is \n\n\"" + stdout + "\"");
            message.channel.send(embed);
        });
    }
}