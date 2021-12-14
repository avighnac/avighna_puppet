var { exec, spawn } = require('child_process');
const Discord = require('discord.js');

module.exports = {
    name: 'Add',
    description: "Uses an addition algorithm developed by Avighna to add numbers.. infinitely huge.",
    execute(message, args){
        exec('chmod +x commands/scripts/add.out');
        exec('commands/scripts/add.out ' + args[0] + ' ' + args[1], function (err, stdout, stderr) {
            if (err) console.error(stderr);
            const embed = new Discord.MessageEmbed().setTitle('Add').setFooter(args[0] + " + " + args[1] + " = " + stdout);
            message.channel.send(embed);
        });
    }
}