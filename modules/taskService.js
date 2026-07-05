let tasks = []
let nextId = 1

function addTask(title) {
  const task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  }
  
  tasks.push(task)
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
  return task
}

function deleteTask(id) {
  const initialLength = tasks.length

  tasks = tasks.filter((task) => task.id !== id)

  return tasks.length < initialLength
}

module.exports = {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
}