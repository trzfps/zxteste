const fetch = require('node-fetch');
class PDVController {
    CreatePDV(req, res){
        res.send('Criando PDV');
    }
    getPDVById(req, res){
        res.send('Get PDV by id');
    }
    async searchPDV(req, res){
        const response = await fetch('https://raw.githubusercontent.com/ZXVentures/code-challenge/master/files/pdvs.json')
        const data = await response.json();
        let {lat1, long1 } = req.body;
        let pontosRecarga = data.pdvs.map(function (value) {
            let coordenadas = value.address.coordinates.toString().split(',');
            let lat2 = coordenadas[0];
            let long2 = coordenadas[1];
            let R = 6371
            let dLat = (lat2 - lat1) * (Math.PI / 180)
            let dLong = (long2 - long1) * (Math.PI / 180)
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLong / 2) * Math.sin(dLong / 2)
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            let dist = R * c
            return { 'distancia': dist, 'id': value.id, 'address': value.address, 'nome': value.tradingName };
        });
        
        function PDVMaisProximo(prop) {
            return function (a, b) {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
                return 0;
            }
        }
        let PDVSMaisProximos = pontosRecarga.sort(PDVMaisProximo("distancia"));
        res.send(PDVSMaisProximos)
    }

}

module.exports = new PDVController();