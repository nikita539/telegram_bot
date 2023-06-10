const { Scenes } = require('telegraf')
const { words } = require('../words.json')
const { 
    getLength,
    dataIsEmpty
 } = require('../utils.js')



const learn_scene = new Scenes.BaseScene('LEARN_WORDS_SCENE')

learn_scene.enter((context) => {
    context.reply('Начнем изучение слов. Я буду присылать тебе слово на аглийском, а ты перевод')
})
learn_scene.leave((context) => {
    context.reply('молодец, продолжай изучение новых слов')
})

learn_scene.on('text', function(context) {
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


module.exports = {
    learn_scene
}