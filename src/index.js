const { Telegraf, session, Composer } = require('telegraf')
const { Scenes }  = require('telegraf')
require('dotenv').config()
const { SCENES_NAMES } = require('./enums/scenes_names.js') 
const { register_words_scene } = require('./scenes/register_word_scene.js')
const { learn_scene } = require('./scenes/learn_scene.js')


// Фугнкции бота
// 1. Принимать слова от пользователя в нужном формате 'слово - перевод' и добавлять их в словарь
// 2. Присылать пользователь слова, и получать от пользователя сообщения с переводом. 


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session())


const stage = new Scenes.Stage([
    register_words_scene, 
    learn_scene
])


bot.use(stage.middleware())

console.log(bot.handler)



bot.telegram.setMyCommands([
    {
        command: 'register_words',
        description: 'добавить новые слова для изучения в список'
    },
    {
        command: 'learn',
        description: 'начать изучение слов'
    }
])

bot.start(async function(context) {
    await context.sendMessage(`Hello my name is ${context.me}!`)
})

bot.command('register_words', (context) => {
    context.scene.enter(SCENES_NAMES.register_words)
})

bot.command('learn', function(context) {
    context.scene.enter(SCENES_NAMES.learn_words)
})

bot.launch()