const Telegraf = require('telegraf')
import { TOKEN } from './constants'

const bot = new Telegraf.Telegraf(TOKEN)

bot.start(function(context) {
    
    setInterval(function() {
        
        context.reply(Math.random().toString())

    }, 5000)

})



bot.launch()