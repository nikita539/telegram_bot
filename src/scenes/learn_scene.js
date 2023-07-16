const { Scenes } = require('telegraf')
const words = require('../words.json')
const { 
    getLength
 } = require('../utils.js')
 const { SCENES_NAMES } = require('../enums/scenes_names')




const learn_scene = new Scenes.BaseScene(SCENES_NAMES.learn_words)

// TO-DO: алгоритм работы сцены. Сцена присылает слово на аглийском, в ответ на это сообщение
// пользователь присылает перевод этого слова, если перевод верный, сцена присылает новое слово,


learn_scene.enter(async (context) => {
    context.scene.state.sent_word = words['0']
    await context.reply(`Начнем изучение слов. Я буду присылать тебе слово на аглийском, а ты перевод\n как переводиться это слово ? ${words['0'].word}`)
    context.scene.state.counter = 1
    context.scene.state.mistake = 0
})
learn_scene.leave((context) => {
    context.reply('молодец, продолжай изучение новых слов')
})

learn_scene.on('text', async function(context) {
    function sendWord() {
        context.reply(`${words[context.scene.state.counter]?.word}`)
        context.scene.state.sent_word = words[context.scene.state.counter]
        context.scene.state.counter++
    }

    if (context.scene.state.sent_word.translate === context.message.text.toLocaleLowerCase()) {
        if ( context.scene.state.counter === getLength(words) ) {
            context.scene.state.counter = 0
            context.scene.state.sent_word = words[context.scene.state.counter]
            await context.reply(` ${words[context.scene.state.counter]?.word}`)
            context.scene.state.counter++
            return
        }

        words[context.scene.state.counter-1].right_answered++
        words[context.scene.state.counter-1].count_showed++
        context.reply(`${words[context.scene.state.counter]?.word}`)
        context.scene.state.sent_word = words[context.scene.state.counter]
        context.scene.state.counter++
        return
    } else {
        if (context.scene.state.mistake == 4) {
            context.reply(`это слово преаводится так ${words[context.scene.state.counter].translate}, запомни) `)
            context.scene.state.counter++
            context.scene.state.sent_word = words[context.scene.state.counter]
            context.reply(`${words[context.scene.state.counter]?.word}`)
            context.scene.state.mistake = 0
            return
        }
        context.reply('не правильно, попробуй ещё')
        context.scene.state.mistake++
    }
   
})


module.exports = {
    learn_scene
}