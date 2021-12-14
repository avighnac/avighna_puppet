var { exec, spawn } = require('child_process');
const Discord = require('discord.js');

module.exports = {
    name: 'Sqrt',
    description: "Syntax: .sqrt [number] [accuracy (default == 8)]",
    execute(message, args){
        exec('chmod +x commands/scripts/sqrt.out');
        let accuracy = "8";
        let time = "";
        if (args[1] != undefined) accuracy = args[1];
        if (args[2] != undefined) time = args[2];
        console.log('[EXECUTE] commands/scripts/sqrt.out ' + args[0] + " " + accuracy + " " + time);
        exec('commands/scripts/sqrt.out ' + args[0] + " " + accuracy + " " + time, function (err, stdout, stderr) {
            if (err) console.error(stderr);
            const embed = new Discord.MessageEmbed().setTitle('Square Root').setFooter('√' + args[0] + " = " + stdout + " (accurate to " + accuracy + " decimal places)");
            message.channel.send(embed);
        });
    }
}