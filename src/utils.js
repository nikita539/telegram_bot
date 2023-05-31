function getLength(obj) {
    return Array.isArray(obj) ? obj.length : Object.keys(obj).length
}

function wordIs(word, obj) {
    return  Object.keys(obj).some((key) => obj[key].word === word)
}

module.exports = {
    getLength,
    wordIs
}