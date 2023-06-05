const Telegraf = require('telegraf')
require('dotenv').config();
const words = require('./words.json');
const { getLength, wordIs, createWordObj, dataIsEmpty } = require('./utils');


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
    }, 
    {
        command: 'delete',
        description: 'удалить все слова из словаря'
    }
])

bot.start(function(context) {
    context.sendMessage(`Hello my name is ${context.me}!`)
})

bot.command('register_words', function() {
    bot.on('text', function(context) {
        if (getLength(words) > 50) {
            context.sendMessage('словарь переполнен')
            return
        }

        const splited_word = context.message.text.split('-')

        if (wordIs(splited_word[0], words)) {
            context.sendMessage('такое слово уже есть')
            return
        }

        const word = new createWordObj(splited_word[0], splited_word[0])

        words[getLength(words)] = word
        console.log(words)
    })
})

bot.command('words', function(context) {
    if (!getLength(words)) {
        context.sendMessage('словарь пуст')
    }

    const result = Object.keys(words).map((key) => `${words[key].word} - ${words[key].translate}`)
    context.sendMessage(result.join('\n'))    
})

bot.command('learn', function(context) {

    if (dataIsEmpty(words)) {
        context.reply('словарь пуст, добавь слова')
        return
    }

    function sendWords(callback, count) {
        let i = 0

        async function timeout() {
            await callback(i)
                i++

            if (i < count) {
                timeout()
            }
        }

        timeout()
    }

     async function callback (i) {
        const message = `как преводиться это слово? ${words[`${i}`].word}`
        await context.sendMessage(message)
    }


    sendWords(callback, getLength(words))

})

bot.command('delete', function(context) {
    Object.keys(words).forEach((key) => {
       delete words[key]
    })

    if (dataIsEmpty(words)) {
        context.reply('словарь пуст')
    }
})


bot.launch()