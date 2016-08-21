'use strict'

var os = require('os')

function getIp(){
    let network = os.networkInterfaces()
    let localIP = []
    Object.keys(network).forEach(item => {
        network[item].forEach(i => {
            if(i.family != 'IPv4' || i.internal) {
                return
            }

            localIP.push(i.address)
        })
    })

    return localIP
}

module.exports = getIp
