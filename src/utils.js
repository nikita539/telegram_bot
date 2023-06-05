function getLength(obj) {
    return Array.isArray(obj) ? obj.length : Object.keys(obj).length
}

function wordIs(word, obj) {
    return  Object.keys(obj).some((key) => obj[key].word === word)
}

function createWordObj(word,translate) {
    this.word = word
    this.translate = translate
    this.count_showed = 0
    this.right_answered = 0
}

function dataIsEmpty(obj) {
    const res = JSON.stringify(obj)
    return res === '[]' || res === '{}'
}

module.exports = {
    getLength,
    wordIs,
    createWordObj,
    dataIsEmpty
}