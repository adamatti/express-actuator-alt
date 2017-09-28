"use strict"

const port = 3000,
      express = require('express'),
      app = express(),
      actuator = require("../index")({
          appName: "Sample Node App",
          baseUrl: `http://localhost:${port}`,
          managementUrl: "/management",
          adminUrl: "http://localhost:8080",
          adminPollingInterval: 1000
      })

app.use("/management",actuator)      

app.get('/',  (req, res) => {
    console.log("Root called")
    res.send('Hello World!')
})

app.listen(port,  () => {
    console.log(`Example app listening on port ${port}!`)
})
