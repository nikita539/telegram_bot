const Telegraf = require('telegraf')
require('dotenv').config();
const words = require('./words.json');
const { getLength, wordIs } = require('./utils');


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
    bot.on('text', function(context) {
        const splited_word = context.message.text.split('-')

        if (wordIs(splited_word[0], words)) {
            context.sendMessage('такое слово уже есть')
            return
        }

        const word = {
            word: splited_word[0],
            translate: splited_word[1],
            count_showed: 0,
            right_answered: 0
        }
        words[getLength(words)] = word
        console.log(words)
    })
})

bot.command('words', function(context) {
    const result = Object.keys(words).map((key) => `${words[key].word} - ${words[key].translate}`)
    context.sendMessage(result.join('\n'))
})

bot.command('learn', function(context) {

})




bot.launch()