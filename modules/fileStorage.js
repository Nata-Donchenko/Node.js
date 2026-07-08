const fs = require('fs')
const path = require('path')

const pathJson = path.join(__dirname, '..', 'data', 'tasks.json')
const pathFolder = path.join(__dirname, '..', 'data')

function readTasks() {
  
  const tasksJson = fs.readFileSync(pathJson, 'utf-8')
  const tasks = JSON.parse(tasksJson)
  
  return tasks
}

function saveTasks(tasks) {

  const tasksJson = JSON.stringify(tasks, null, 2)

  fs.writeFileSync(pathJson, tasksJson)
}

function initStorage() {
  
  const isExistFolder = fs.existsSync(pathFolder)
  const isExistJson = fs.existsSync(pathJson)

  if(!isExistFolder) {
    fs.mkdirSync(pathFolder)
  } 

  if(!isExistJson) {
    fs.writeFileSync(pathJson, JSON.stringify([]))
  }
}

module.exports = {
  readTasks,
  saveTasks,
  initStorage
}