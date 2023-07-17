const { Scenes } = require('telegraf')
const words = require('../words.json')
const { 
    getLength
} = require('../utils.js')
const { SCENES_NAMES } = require('../enums/scenes_names')




const learn_scene = new Scenes.BaseScene(SCENES_NAMES.learn_words)

// TO-DO: алгоритм работы сцены. Сцена присылает слово на аглийском, в ответ на это сообщение
// пользователь присылает перевод этого слова, если перевод верный, сцена присылает новое слово


learn_scene.enter(async (context) => {
    const sceneState = context.scene.state

    sceneState.counter = 0
    sceneState.mistake = 0
    await context.reply(`Начнем изучение слов. Я буду присылать тебе слово на аглийском, а ты перевод\n как переводиться это слово ? ${words[sceneState.counter].word}`)
    sceneState.sent_word = words[sceneState.counter]
})

learn_scene.leave((context) => {
    context.reply('молодец, продолжай изучение новых слов')
})

learn_scene.on('text', async function(context) {
    const sceneState = context.scene.state
    async function sendWord() {
        sceneState.counter++
        sceneState.sent_word = words[sceneState.counter]
        await context.reply(`${words[sceneState.counter]?.word}`)
    }

    if (sceneState.sent_word.translate === context.message.text.toLocaleLowerCase()) {
        if ( sceneState.counter === getLength(words) - 1 ) {
            sceneState.counter = 0
            sceneState.sent_word = words[sceneState.counter]
            await context.reply(`${words[sceneState.counter]?.word}`)
            return
        }

        words[sceneState.counter].right_answered++
        words[sceneState.counter].count_showed++
        sendWord()
        return
    } else {
        if (sceneState.mistake == 4) {
            context.reply(`это слово преаводится так ${words[sceneState.counter].translate}, запомни) `)
            sceneState.mistake = 0
            sceneState.counter = 0
            sendWord()
            return
        }
        context.reply('не правильно, попробуй ещё')
        sceneState.mistake++
    }
   
})


module.exports = {
    learn_scene
}