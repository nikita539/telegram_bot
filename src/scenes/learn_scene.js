const { Scenes } = require('telegraf')
const words = require('../words.json')
const { 
    getLength,
    dataIsEmpty
 } = require('../utils.js')
 const { SCENES_NAMES } = require('../enums/scenes_names')




const learn_scene = new Scenes.BaseScene(SCENES_NAMES.learn_words)

learn_scene.enter(async (context) => {
    context.scene.state.sent_word = words['0']
    context.scene.state.counter = getLength(words) - 1
    console.log(context.scene.state.counter)
    await context.reply(`Начнем изучение слов. Я буду присылать тебе слово на аглийском, а ты перевод\n как переводиться это слово ? ${words['0'].word}`)
})
learn_scene.leave((context) => {
    context.reply('молодец, продолжай изучение новых слов')
})

learn_scene.on('text', async function(context) {
    if (context.message.text === '/cancel') {
        await context.scene.leave()
        return
    }

    switch(context.message.text.toLocaleLowerCase()) {
        case 'помоги':
            await context.reply(`это слово преводиться так: ${context.scene.state.sent_word.translate}`)
            break

        case context.scene.state.sent_word.translate:
        
            
            if ( context.scene.state.counter == 0 ) {
                await context.reply('ты прорешал все слова, из словаря')
                await context.scene.leave()
                break
            }

            context.scene.state.sent_word = words[context.scene.state.counter]
            await context.reply(`Правильно, а как переводиться это слово ? ${words[context.scene.state.counter]?.word}`)
            context.scene.state.counter = context.scene.state.counter - 1
            break

        
        default:
            await context.reply('это слово переводиться по-дрогому, подумай ещё)')
            console.log(context.scene.state)
            break  


    }
   
})


module.exports = {
    learn_scene
}