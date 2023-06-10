const { Scenes } = require('telegraf')
const words = require('../words.json')
const { 
    getLength,
    wordIs,
    createWordObj
 } = require('../utils.js')



const register_words_scene = new Scenes.BaseScene('REGISTER_WORD_SCENE')

register_words_scene.enter(function(context) {
    context.reply('напшите несколько слов, они будут добавленны в словарь')
})

register_words_scene.leave(function(context) {
    context.reply(`слова были успешно добавленны`)
})

register_words_scene.on('text', function(context) {
    if (getLength(words) > 50) {
        context.sendMessage('словарь переполнен')
        return
    }

    const splited_word = context.message.text.split('-')

    if (wordIs(splited_word[0], words)) {
        context.sendMessage('такое слово уже есть')
        return
    }

    const word = new createWordObj(splited_word[0], splited_word[1])

    words[getLength(words)] = word
})
module.exports = {
    register_words_scene
}