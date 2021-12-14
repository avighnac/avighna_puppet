module.exports = {
    name: 'Ping',
    description: "This is a ping command!",
    execute(message, args){
        message.reply('Pong!') 
    }
}