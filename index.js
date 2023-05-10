const Telegraf = require('telegraf');
const { GIF_API } = require('./gif_api');
require('dotenv').config();

const bot = new Telegraf.Telegraf(process.env.BOT_TOKEN)

bot.start(function(context) {
    context.sendMessage(`Hello my name is ${context.me}!`)
})

bot.on('text', async function(context) {
    const gifRegexp = new RegExp('gif|гиф','gi')
    const stickerRegexp = new RegExp('стикер','gi')
    

    if (gifRegexp.test(context.message.text)) {
        const response = await GIF_API.getRandomGif()
        context.sendAnimation(response.data.data.images.fixed_width_still.url)
        
        return
    } else if (stickerRegexp.test(context.message.text)) {
        const response = await GIF_API.getRandomSticker()
        context.sendSticker(response.data.data.images.fixed_width_still.url)
        
        return 
    }


    context.sendMessage("Что ты хочешь ?")
   
})



bot.launch()