const { Scenes } = require('telegraf')
const words = require('../words.json')
const { SCENES_NAMES } = require('../enums/scenes_names')


const show_words_scene = new Scenes.BaseScene(SCENES_NAMES.show_words)

show_words_scene.enter(function(context) {
    const msg = Object.keys(words).map(function(key) {
        return `${words[key].word} - ${words[key].translate}`
    })
    .join('\n')
    context.reply(msg)
})

module.exports = {
    show_words_scene
}