const { Telegraf, session } = require('telegraf')
const { Scenes }  = require('telegraf')
require('dotenv').config()
const { SCENES_NAMES } = require('./enums/scenes_names.js') 
const { register_words_scene } = require('./scenes/register_word_scene.js')
const { learn_scene } = require('./scenes/learn_scene.js')


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session())

const stage = new Scenes.Stage([register_words_scene , learn_scene])
bot.use(stage.middleware())



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
    },
    {
        command: 'cancel',
        description: 'закончить действие'
    }
])

bot.start(function(context) {
    context.sendMessage(`Hello my name is ${context.me}!`)
})

bot.command('register_words', function(context) {
    context.scene.enter(SCENES_NAMES.register_words)
})

bot.command('words', () => {})

bot.command('learn', function(context) {
    context.scene.enter(SCENES_NAMES.learn_words)
})

bot.command('delete', () => {})

bot.launch()