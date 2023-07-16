const { Scenes } = require('telegraf')
const words = require('../words.json')
const { 
    getLength,
    wordIs,
    createWordObj
 } = require('../utils.js')
 const { SCENES_NAMES } = require('../enums/scenes_names')



 const checkWordForRegister = (word) => {
    return /^[a-z]+\s-\s[a-я]+$/gi.test(word) || /^[a-z]+-[a-я]+$/gi.test(word)
 }
 const addWordToVocabulary = (word) => {
    const splited_word = word.split('-')
    const result = new createWordObj( splited_word[0].trim(), splited_word[1].trim() )
    words[getLength(words)] = result
 }



const register_words_scene = new Scenes.BaseScene(SCENES_NAMES.register_words)

register_words_scene.on('text', async function(context) {
    const userMessage = context.message.text

    if (userMessage === '/learn') return context.scene.leave()

    if (checkWordForRegister(userMessage)) {
        if (wordIs(userMessage, words)) {
            return await context.reply('такое слово уже есть')
        } 

        addWordToVocabulary(userMessage)
        await context.reply('добавил')
    } else {
        context.reply('введите слово в нужном формате: слово - перевод')
    }

})
module.exports = {
    register_words_scene
}