const axios = require('axios')

const GIF_API = {
    STIKERS_URL: "api.giphy.com/v1/stickers",
    GIFS_URL: "api.giphy.com/v1/gifs",
    GIF_API_KEY: "pium5ayLlX75gfIKmNYkuJx6DbczwilI",


    async getRandomGif() {
        const requestURL = `https://${this.GIFS_URL}/random?api_key=${this.GIF_API_KEY}`
        let data;

        await axios.get(requestURL).then(function(response) {
            data = response
        }).catch(function(err) {
            console.log(err)
        })

    
        return data

    },

    async getRandomSticker() {
        const requestURL = `https://${this.STIKERS_URL}/random?api_key=${this.GIF_API_KEY}`

        let data;

        await axios.get(requestURL).then(function(response) {
            data = response
        }).catch(function(err) {
            console.log(err)
        })

    
        return data
    }

}

module.exports = {
    GIF_API: GIF_API
}