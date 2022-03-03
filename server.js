require('dotenv').config();
const { MessageAttachment } = require("discord.js")
const { info } = require('console');
var { exec, spawn } = require('child_process');
const Discord = require('discord.js');
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const prefix = ".";

const getApp = (guildId) => {
    const app = client.api.applications(client.user.id)

    if (guildId) {
        app.guilds(guildId);
    }
    return app;
}

const guildId = '888512408413421609'

client.once('ready', async () => {
    console.log('It works! The bot is running!');

    const commands = await getApp(guildId)
    .commands.get()
    // console.log(commands);

    /*
    await getApp(guildId).commands.post({
        data: {
            name: 'ping',
            description: 'This is a ping command!',
        }
    })
    await getApp(guildId).commands.post({
        data: {
            name: 'invite',
            description: 'Do you wanna invite somebody? Well now you can!',
        }
    })
    await getApp(guildId).commands.post({
        data: {
            name: 'rot13',
            description: "ROT (13) your text!",
            options: [
                {
                    name: 'text',
                    description: 'Text to convert!',
                    required: true,
                    type: 3,
                }
            ],
        }
    })
    */

    /* client.api.applications(client.user.id).commands.post({data: {
        name: 'rvc',
            description: "Simple reverse-word-cipher!",
            options: [
                {
                    name: 'text',
                    description: 'Text to convert!',
                    required: true,
                    type: 3,
                }
            ],
    }}) 
    
    client.api.applications(client.user.id).commands.post({data: {
        name: 'mock',
            description: "mOcKs tExT",
            options: [
                {
                    name: 'text',
                    description: 'Text to mock.',
                    required: true,
                    type: 3,
                }
            ],
    }})

    */

    /*
    client.api.applications(client.user.id).commands.post({data: {
        name: 'ping',
        description: 'ping pong!'
    }}) */

    /*
    client.api.applications(client.user.id).commands.post({
        data: {
                name: 'math',
                description: "Use math++ in discord.",
                options: [
                    {
                        name: 'command-arguments',
                        description: 'Type in your command, like you would on a normal command line.',
                        required: true,
                        type: 3,
                    }
                ],
        }
    })

    client.api.applications(client.user.id).commands.post({
        data: {
                name: 'draw',
                description: "Draw geometrical figures!",
                options: [
                    {
                        name: 'polygon-name',
                        description: 'Eg: right_angle_triangle',
                        required: true,
                        type: 3,
                    },
                    {
                        name: 'sides',
                        description: 'Syntax: [side1] [side2] ... [sideN]',
                        required: true,
                        type: 3,
                    }
                ],
        }
    })
    */

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        
        const { name, options } = interaction.data;
        
        const command = name.toLowerCase();

        if (command === 'ping') {
            interaction.deferReply();
            interaction.editReply({ content: "replied" });
        }
        if (command === 'invite') {
            reply(interaction, 'https://discord.gg/u8kpgmwdz5');
        }
        if (command === 'rot13') {
            exec('chmod +x commands/scripts/rot13.out');

            let text = interaction.data.options[0].value;

            console.log('[EXECUTE] commands/scripts/rot13.out \"' + text + "\"");

            exec('commands/scripts/rot13.out \"' + text + "\"", function (err, stdout, stderr) {
                if (err) console.error(stderr);
                reply(interaction, stdout);
            });
        }
        if (command === 'rvc') {
            exec('chmod +x commands/scripts/rvc.out');

            let text = interaction.data.options[0].value;

            console.log('[EXECUTE] commands/scripts/rvc.out \"' + text + "\"");

            exec('commands/scripts/rvc.out \"' + text + "\"", function (err, stdout, stderr) {
                if (err) console.error(stderr);
                reply(interaction, stdout);
            });
        }
        if (command === 'math') {
            exec('chmod +x commands/scripts/math++.out');

            let command_arguments = interaction.data.options[0].value;

            console.log('[EXECUTE] commands/scripts/math++.out ' + command_arguments);

            exec('commands/scripts/math++.out ' + command_arguments, function (err, stdout, stderr) {
                if (err) console.error(stderr);
                reply(interaction, '>>> ' + stdout);
            });
        }
        if (command === 'draw') {
            exec('chmod +x commands/scripts/math++.out');

            let shape = interaction.data.options[0].value;
            let sides = interaction.data.options[1].value;

            console.log('[EXECUTE] commands/scripts/math++.out draw ' + shape + ' ' + sides);

            exec('commands/scripts/math++.out draw ' + shape + ' ' + sides, function (err, stdout, stderr) {
                if (err) console.error(stderr);
            });

            const file = new MessageAttachment (
                "image.bmp"
            );

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "hello",
                        "embeds": [
                            {
                            "title": `This is a cool embed`,
                            image: {
                                url: 'attachment://image.bmp',
                            },
                            "type": "rich",
                            "description": "",
                            "color": 0x00FFFF
                            }
                        ]
                    },
                }
            })
        }
        if (command == 'mock') {
            exec('chmod +x commands/scripts/mock.out');

            let text = interaction.data.options[0].value;

            console.log('[EXECUTE] commands/scripts/mock.out \"' + text + "\"");

            exec('commands/scripts/mock.out \"' + text + "\"", function (err, stdout, stderr) {
                if (err) console.error(stderr);
                reply(interaction, stdout);
            });
        }
    })
});

const reply = async (interaction, response) => {

    let data = {
        content: response
    }

    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data,
        }
    })
}

const fs = require('fs');
const { description } = require('./commands/rot13');
const rot13 = require('./commands/rot13');
const { restart } = require('nodemon');
client.commands = new Discord.Collection();
const allCommands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of allCommands) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == "ping") client.commands.get('Ping').execute(message, args);
    else if (command == 'invite') client.commands.get('Invite').execute(message, args);
    else if (command == 'add') client.commands.get('Add').execute(message, args);
    else if (command === 'mute') client.commands.get('Mute').execute(message, args);
    else if (command === 'unmute') client.commands.get('Unmute').execute(message, args);
    else if (command === 'remove_subsequent_spaces') client.commands.get('remove_subsequent_spaces').execute(message, args);
    else if (command == 'mock') client.commands.get('Mock').execute(message, args);
    else if (command == 'help') client.commands.get('Help').execute(message, args);
    else if (command == 'rot13') client.commands.get('Rot13').execute(message, args);
    else if (command == 'ebg13') message.channel.send('Did you mean .rot13, but in ROT13? :wink:');
    else if (command == 'sqrt') client.commands.get('Sqrt').execute(message, args);
    else if (command === 'draw') {
        exec('chmod +x commands/scripts/math++.out');

        console.log('[EXECUTE] commands/scripts/math++.out draw ' + args[0] + ' ' + args[1] + ' ' + args[2] + ' ' + args[3]);

        exec('commands/scripts/math++.out draw ' + args[0] + ' ' + args[1] + ' ' + args[2] + ' ' + args[3], function (err, stdout, stderr) {
            if (err) console.error(stderr);
        });
        
        const attachment = new Discord.MessageAttachment('image.bmp', 'image.bmp');

        const embed = new Discord.MessageEmbed().setTitle('Attachment').setImage('attachment://image.bmp');
        message.channel.send({ embeds: [embed], files: ['image.bmp'] });
    }
    else message.channel.send("_bro that isnt a command_");
});

client.login(process.env.TOKEN);
