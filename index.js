const Telegraf = require('telegraf');
const { GIF_API } = require('./gif_api');
require('dotenv').config();

const bot = new Telegraf.Telegraf(process.env.BOT_TOKEN)

bot.start(function(context) {
    context.sendMessage(`Hello my name is ${context.me}!`)
})

bot.on('text', function(context) {
    let regexp = new RegExp('gif|гиф','gi')
    const text =  context.message.text


    if (regexp.test(text)) {
        GIF_API.getRandomGif().then(function(response) {
            context.sendAnimation(response.data.data.images.fixed_width_still.url)
        })
        
        return
    }

    context.sendMessage("Что ты хочешь ?")
   
})



bot.launch()