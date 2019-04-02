const fetch = require('node-fetch')


fetch('https://raw.githubusercontent.com/ZXVentures/code-challenge/master/files/pdvs.json')
    .then(res => res.json())
    .then(json => console.log(json));