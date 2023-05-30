function getLength(obj) {
    return Array.isArray(obj) ? obj.length : Object.keys(obj).length
}

module.exports = {
    getLength
}