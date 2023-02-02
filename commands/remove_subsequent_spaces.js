const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: 'remove_subsequent_spaces',
    description: "Removes subsequent spaces.",
    execute (message, args) {

        let str = message.content.substr(26, message.content.length);

        /*function remove_part_of_string(str, start, end) {
            let answer = "";

            for (let i = 0; i < str.length; i++) {
                if (!(start <= i && i <= end)) answer += str[i];
            }

            return answer;
        }

        function remove_sub_spaces(str) {
            for (let i = 0; i < str.length; i++) {
                if (i + 1 < str.length) { //Deleting forwards
                    if (str[i] == ' ' && str[i + 1] == ' ') {
                        str = remove_part_of_string(str, i, i);
                    }
                }
        
                if (i - 1 > -1) { //Deleting backwards
                    if (str[i] == ' ' && str[i - 1] == ' ') {
                        str = remove_part_of_string(str, i, i);
                    }
                }
            }

            return str;
        }*/

        let str_before = str;
        str = str.replace("  "," ");
        while (str != str_before) {
            str_before = str;
            str = str.replace("  "," ");
        }

        //message.channel.send('The message \"' + message.content.substr(26, message.content.length)+ '\" without subsequent spaces is \"' + str + '\"');
        const embed = new Discord.MessageEmbed()
        .setTitle('Remove Subsequent Spaces')
        .setFooter('The message \"' + message.content.substr(26, message.content.length)+ '\" without subsequent spaces is \"' + str + '\"');

        message.channel.send(embed);
    }
}
