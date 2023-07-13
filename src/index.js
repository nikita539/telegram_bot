const { Telegraf, session } = require('telegraf')
const { Scenes }  = require('telegraf')
require('dotenv').config()
const { SCENES_NAMES } = require('./enums/scenes_names.js') 
const { register_words_scene } = require('./scenes/register_word_scene.js')
const { learn_scene } = require('./scenes/learn_scene.js')
const { show_words_scene } = require('./scenes/show_words_scene.js')
const { delete_scene } = require('./scenes/delete_scene.js')

//TO-DO: новый принцип работы бота. Когда бот активируется, он отправляет сообщение пользователю
// Привет, ...правила пользования
// Функционал. Бот всегда принимает слова от пользователя и добавляет их в словарь. Если слово уже есть в словаре, бот его не добавляет
// если слова нет, то оно добовлятся в виде объекта со свойствами, что бы бот понмал сколько раз то или иное слово отпралялось и тд 
// что бы начать учить слова, нужно нажать на кнопку учить слова. и бот начнет присылать слова, на котрые пользователь должен ответть переаводом.
// в зависимости от правильности ответа бот будет что-то отвечать 


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session())

const stage = new Scenes.Stage([
    register_words_scene, 
    learn_scene, 
    show_words_scene,
    delete_scene
])
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

bot.start(async function(context) {
    await context.sendMessage(`Hello my name is ${context.me}!`)
    await context.reply()
})

bot.command('register_words', (context) => {
    context.scene.enter(SCENES_NAMES.register_words)
})

bot.command('words', (context) => {
    context.scene.enter(SCENES_NAMES.show_words)
})

bot.command('learn', function(context) {
    context.scene.enter(SCENES_NAMES.learn_words)
})

bot.command('delete', (context) => {
    context.scene.enter(SCENES_NAMES.delete)
})

bot.launch()