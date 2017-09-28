"use strict"

const express = require("express"),
      diskspace = require('fd-diskspace').diskSpace,
      os = require('os'),
      _ = require("lodash"),
     router = express.Router()

router.get("/health",(req,res) => {
    diskspace((err, response)=> {
        res.status(200).send({
            status: "UP",
            diskSpace: {
                status: "UP",
                total: response.total.size * 1024,
                free: response.total.free * 1024,
                threshold: 10485760 //10mb
            }
        })
    })
})

router.get("/env",(req,res) => {
    res.status(200).send({
        systemEnvironment: process.env
    })
})

router.get("/trace",(req,res) => {
    //FIXME not implemented
    res.status(200).send([])
})

router.get("/metrics",(req,res) =>{
    res.status(200).send({
        mem: os.totalmem() / 1024 /1024,
        "mem.free": os.freemem() / 1024 /1024,
        processors: os.cpus().size,
        uptime: process.uptime(),
        "systemload.average": _.mean(os.loadavg())
    })
})

router.get("/info",(req,res) =>{
    res.status(200).send({})
})

module.exports = router