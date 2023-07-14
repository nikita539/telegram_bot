function getLength(obj) {
    return Array.isArray(obj) ? obj.length : Object.keys(obj).length
}

function wordIs(word, obj) {
  const splited_word = word.split('-')
  return  Object.keys(obj).some((key) => obj[key].word === splited_word[0].trim())
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

const findPath = (ob, key) => { // returns path to key
    const path = [];
    
    const keyExists = (obj) => {
      if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
        return false;
      }
      else if (obj.hasOwnProperty(key)) {
        return true;
      }
      else if (Array.isArray(obj)) {
        let parentKey = path.length ? path.pop() : "";
  
        for (let i = 0; i < obj.length; i++) {
          path.push(`${parentKey}[${i}]`);
          const result = keyExists(obj[i], key);
          if (result) {
            return result;
          }
          path.pop();
        }
      }
      else {
        for (const k in obj) {
          path.push(k);
          const result = keyExists(obj[k], key);
          if (result) {
            return result;
          }
          path.pop();
        }
      }
      return false;
    };
  
    keyExists(ob);
  
    return path.join(".");
}

module.exports = {
    getLength,
    wordIs,
    createWordObj,
    dataIsEmpty,
    findPath
}