const EventEmitter = require('events')
const path = require('path')
const fs = require('fs')

const emitter = new EventEmitter()

const pathEventLog = path.join(__dirname, '..', 'data', 'events.log')

function saveEventLog(eventName, eventDescription) {
  const date = new Date().toISOString()
  const log = `${date} | ${eventName} | ${eventDescription} \n`

  fs.appendFileSync(pathEventLog, log) 
}

emitter.on('taskCreated', (task) => {
  const taskName = task.title
  const eventDescription = `Task '${taskName}' was created`

  saveEventLog('taskCreated', eventDescription)
})

emitter.on('taskCompleted', (task) => {
  const taskName = task.title
  const eventDescription = `Task '${taskName}' was completed`

  saveEventLog('taskCompleted', eventDescription)
})

emitter.on('taskDeleted', (task) => {
  const taskName = task.title
  const eventDescription = `Task '${taskName}' was deleted`

  saveEventLog('taskDeleted', eventDescription)
})

emitter.on('appStarted', () => {
  const eventDescription = 'Application started'

  saveEventLog('appStarted', eventDescription)
})


module.exports = {
  emitter,
  saveEventLog,

}