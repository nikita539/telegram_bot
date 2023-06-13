const { Scenes } = require('telegraf')
const words = require('../words.json')
const { 
    getLength,
    wordIs,
    createWordObj
 } = require('../utils.js')

async function leave(context) {
    if (context.message.text === '/cancel') {
        await context.scene.leave()
    }
}

const register_words_scene = new Scenes.BaseScene('REGISTER_WORDS_SCENE')

register_words_scene.enter(function(context) {
    context.reply('напшите несколько слов, они будут добавленны в словарь')
})

register_words_scene.leave(function(context) {
    context.reply(`слова были успешно добавленны`)
})

register_words_scene.on('text', async function(context) {
    leave(context) // выходит из сцены, если была вызвана команда /cancel

    if (getLength(words) > 50) {
        context.sendMessage('словарь переполнен')
        return
    }

    if (/^[a-z]+\s-\s[a-я]+$/gi.test(context.message.text)) { // TO DO: написать регялрку для формата ввода (i used to - раньше я )
        const splited_word = context.message.text.split('-')

        if (wordIs(splited_word[0], words)) {
            context.sendMessage('такое слово уже есть')
            return
        }

        const word = new createWordObj(splited_word[0].trim(), splited_word[1].trim())
        words[getLength(words)] = word
        return
    }

    context.reply('напишите слово в формате слово - перевод')

})
module.exports = {
    register_words_scene
}