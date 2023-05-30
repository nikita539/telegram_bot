const Telegraf = require('telegraf');
require('dotenv').config();
const utils = require('./utils')


const bot = new Telegraf.Telegraf(process.env.BOT_TOKEN)

bot.telegram.setMyCommands([
    {
        command: 'words',
        description: 'прислать список слов'
    },
    {
        command: 'register_words',
        description: 'добавить новые слова для изучения в список'
    },
    {
        command: 'learn',
        description: 'начать изучение слов'
    }
])

bot.start(function(context) {
    context.sendMessage(`Hello my name is ${context.me}!`)
})

bot.command('register_words', function(context) {
    
})

bot.command('words', function(context) {

})

bot.command('learn', function(context) {

})




bot.launch()