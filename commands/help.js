const Discord = require('discord.js');

module.exports = {
    name: 'Help',
    description: "Prints out information about the bot.",
    execute(message, args) {
        let items = [
            "1. .help: Displays this embed which will hopefully help you use this bot.",
            "2. .mock: mOcKs TeXt.",
            "3. .invite: Wanna invite somebody? Well now you can!",
            "4. .ping: This is a ping command!",
            "5. .remove_subsequent_spaces: Removes subsequent spaces.",
            "6. .add: Uses an addition algorithm developed by Avighna to add numbers.. infinitely huge.",
            "7. .rot13: ROT13 is a shift cipher, that’s a simple kind of encryption where the ciphertext is created by taking the plain text message and shifting (moving forward in the alphabet) by a certain number of letters. The name is a shorthand version of ‘rotation 13’.",
            "8. .sqrt: Syntax: .sqrt [number] [accuracy (default == 8)]"
        ];

        const embed = new Discord.MessageEmbed()
        .setTitle('Help')
        .setColor('#0099ff');

        for (let i = 0; i < items.length; i++) {
            embed.setDescription(items.join("\n"));
        }

        message.channel.send(embed).catch(err => console.error("\n\n\n\n\n\n\n" + err + "\nerror^"));
    }
}