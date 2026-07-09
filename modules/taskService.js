const { emitter } = require('./eventLogger')
const crypto = require('crypto')

let tasks = []
let nextId = 1

function addTask(title) {
  const id = nextId++
  const createdAt = new Date().toISOString()
  const hash = crypto
    .createHash('sha256')
    .update(`${id}-${title}-${createdAt}`)
    .digest('hex')

  const task = {
    id,
    title,
    completed: false,
    createdAt,
    hash
  }

  tasks.push(task)

  emitter.emit('taskCreated', task)

  return task
}

function getTasks() {
  return tasks
}

function completeTask(id) {
  const task = tasks.find((task) => task.id === id)

  if(!task) {
    console.log(`Задачу з id=${id} не знайдено`)
    return null
  }

  task.completed = true

  emitter.emit('taskCompleted', task)

  return task
}

function deleteTask(id) {
  const initialLength = tasks.length
  const task = tasks.find((task) => task.id === id)

  tasks = tasks.filter((task) => task.id !== id)

  if(task) {
    emitter.emit('taskDeleted', task)
  }

  return tasks.length < initialLength
}

function loadTasks(loadedTasks) {
  tasks = loadedTasks
}

module.exports = {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
  loadTasks,
}