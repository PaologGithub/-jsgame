const colors = require("colors")
const fs = require("fs")
const store = require("store")

function check(_callback) {
    if (!fs.existsSync(store.get("@jsgame/log.dir") + "/latest.log")) {
        const file = fs.createWriteStream(store.get("@jsgame/log.dir") + "/latest.log");
        file.write("[INFO] Created New Log!\n")
        file.close()
        if (!fs.existsSync(store.get("@jsgame/log.dir") + "/logs/")) {
            fs.mkdirSync(store.get("@jsgame/log.dir") + "/logs")
            setTimeout(()=>{
                _callback()
            },200) 
        } else {
            setTimeout(()=>{
                _callback()
            },200) 
        }
    } else {
        if (!fs.existsSync(store.get("@jsgame/log.dir") + "/logs/")) {
            fs.mkdirSync(store.get("@jsgame/log.dir") + "/logs")
            setTimeout(()=>{
                _callback()
            },200) 
        } else {
            setTimeout(()=>{
                _callback()
            },200) 
        }
    }
}

colors.enable()

function info(str) {
    check(() => {
        const date = new Date()
        process.stdout.write(`[INFO (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})] ` + str + "\n")
        fs.appendFileSync(store.get("@jsgame/log.dir") + "/latest.log", `[INFO (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})] ` + str + "\n")

    })
}
function warning(str) {
    check(() => {
        const date = new Date()
        process.stdout.write('[' + `WARNING (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`.yellow + "] " + str + "\n")
        fs.appendFileSync(store.get("@jsgame/log.dir") + "/latest.log", '[' + `WARNING (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})` + "] " + str + "\n")
    })
    
}
function error(str) {
    check(() => {
        const date = new Date()
        process.stdout.write('[' + `ERROR (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`.bgRed + "] " + str + "\n")
        fs.appendFileSync(store.get("@jsgame/log.dir") + "/latest.log", '[' + `ERROR (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})` + "] " + str + "\n")
    })
    
}
function log(str) {
    check(() => {
        const date = new Date()
        process.stdout.write('[' + `LOG (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`.blue + "] " + str + "\n")
        fs.appendFileSync(store.get("@jsgame/log.dir") + "/latest.log", '[' + `LOG (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})` + "] " + str + "\n")
    })
}
function finished(str) {
    check(() => {
        const date = new Date()
        process.stdout.write('[' + `FINISHED (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`.green + "] " + str + "\n")
        fs.appendFileSync(store.get("@jsgame/log.dir") + "/latest.log",'[' + `FINISHED (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})` + "] " + str+ "\n")
    })
}
function quit(_callback = () => {console.log("Quitted @jsgame/log")}) {
    const date = new Date()
    fs.writeFile(store.get("@jsgame/log.dir") + "/logs/log" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + ".log", fs.readFileSync(store.get("@jsgame/log.dir") + "/latest.log"), () => {
        fs.rm(store.get("@jsgame/log.dir") + "/latest.log", _callback)
    })
}

module.exports = {info, warning, error, log, finished, quit}