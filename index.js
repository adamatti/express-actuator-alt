"use strict"

const $http = require('http-as-promised'),
      router = require("./router")

function buildRegisterPayload(config){
    return {
        name: config.appName,
        managementUrl:`${config.baseUrl}${config.managementUrl}`,
        healthUrl:`${config.baseUrl}${config.managementUrl}/health`,
        serviceUrl: config.baseUrl,
        metadata:{}
    }
}

function heartbeat(config){
    return $http.post({
        url: `${config.adminUrl}/api/applications`,
        json: buildRegisterPayload(config),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).spread((response, body) => {
        //console.log("Status: ", response.statusCode)
    }).catch(error => {
        console.error("Error calling spring-boot-admin: ",error.message)
    })
}

function setDefaultConfigValues(config){
    config = config || {}
    config.appName = config.appName || "Unknown app"
    config.adminPollingInterval = config.adminPollingInterval || 10000 
    config.managementUrl = config.managementUrl || "/"
    
    return config
}

module.exports = function(config){
    config = setDefaultConfigValues(config)
    
    if (config.adminUrl) {
        setInterval(heartbeat,config.adminPollingInterval,config)
    }

    return router
}
