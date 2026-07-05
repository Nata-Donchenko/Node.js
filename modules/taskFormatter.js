function showTask(task) {
  const status = task.completed ? 'completed' : 'in progress'
  
  console.log(`[${task.id}] ${task.title} — ${status}`)
}

function showTasksList(tasks) {
  if(tasks.length === 0) {
    console.log('Список порожній');
    return
  }

  tasks.forEach((task) => showTask(task))
}

module.exports = {
  showTask,
  showTasksList,
}