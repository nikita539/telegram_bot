const { Scenes } = require('telegraf')
const words = require('../words.json')
const { SCENES_NAMES } = require('../enums/scenes_names')
const { getLength } = require('../utils')


const delete_scene = new Scenes.BaseScene(SCENES_NAMES.delete)

delete_scene.enter(function(context) {
    for (key in words) {
        delete words[key]
    }

    if (!getLength(words)) {
        context.reply('словарь пуст')
    }
})

module.exports = {
    delete_scene
}
