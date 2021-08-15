const debug = require("./helpers") 
const telegramBot = require("node-telegram-bot-api");

const TOKEN = "1723740544:AAEZeTnLaBoQUHIi0GEjhm3MV6NVjots54k";

console.log("Bot has been started...")

const bot = new telegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

// bot.on('message', (msg) => {
//     const { id } = msg.chat
//    bot.sendMessage(id, debug(msg))
//     .then(() => {
//         console.log("Message has been send")
//     })
//     .catch((error) => {
//         console.error(error)
//     })
// })

bot.onText(/\/start/, msg => {
    const { id } = msg.chat
    
    bot.sendMessage(id, debug(msg))
})
bot.onText(/\/help (.+)/, (msg, [src, match]) => {
    const { id } = msg.chat
    
    bot.sendMessage(id, debug(match))
})


bot.on("message", msg => {
    
    const { id } = msg.chat
    
    if(msg.text === "Close"){
        bot.sendMessage(id, "close keyboard", {
            reply_markup:{
                remove_keyboard: true
            }
        })
    }else if(msg.text === "Reply"){
        bot.sendMessage(id, "reply message", {
            reply_markup:{
                force_reply: true
            }
        })
    }else{
        
        bot.sendMessage(id, "keyboard", {
            reply_markup: {
                keyboard: [
                    [{
                        text: 'Send location',
                        request_location: true
                    }],
                    ['Reply', 'Close'],
                    [{
                        text: 'Send contact',
                        request_contact: true
                    }]
                ],
                one_time_keyboard: true
            }
        })
    }
    console.log(msg)
})

