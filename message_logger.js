const fs = require('fs');
const date = require('date-fns')
const path = require('path');
const {v4 : uuid} = require('uuid');

function saveLogItem(log){
    fs.appendFileSync(path.join(__dirname, 'message_logger.txt'), log, (err)=>{
        if (err) console.log(err);
    })
}

function createLogItem(message){
    const current_datetime = date.format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')
    const log = message + `\n${uuid()}\n` + current_datetime + '\n' 
    return log;
}

function LogEvents(message){
    saveLogItem(createLogItem(message));
}
module.exports = {LogEvents};