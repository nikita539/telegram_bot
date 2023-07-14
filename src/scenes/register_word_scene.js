const { Scenes } = require('telegraf')
const words = require('../words.json')
const { 
    getLength,
    wordIs,
    createWordObj
 } = require('../utils.js')
 const { SCENES_NAMES } = require('../enums/scenes_names')



const register_words_scene = new Scenes.BaseScene(SCENES_NAMES.register_words)

register_words_scene.enter(function(context) {
    context.reply('напшите несколько слов, они будут добавленны в словарь')
})

register_words_scene.leave(function(context) {
    context.reply(`слова были успешно добавленны`)
})

register_words_scene.on('text', async function(context) {
    if (context.message.text === '/learn') {
        await context.scene.leave()
    }

    if (/^[a-z]+\s-\s[a-я]+$/gi.test(context.message.text)) { // TO DO: написать регялрку для формата ввода (i used to - раньше я )
        const splited_word = context.message.text.split('-')

        if (wordIs(splited_word[0], words)) {
            context.sendMessage('такое слово уже есть')
            return
        }

        const word = new createWordObj(splited_word[0].trim().toLocaleLowerCase(), splited_word[1].trim().toLocaleLowerCase())
        words[getLength(words)] = word
        return
    } else {
        context.reply('напишите слово в формате слово - перевод')
        return
    }

})
module.exports = {
    register_words_scene
}