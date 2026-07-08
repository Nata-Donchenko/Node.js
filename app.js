const taskService = require('./modules/taskService')
const taskFormatter = require('./modules/taskFormatter')
const fileStorage = require('./modules/fileStorage')

fileStorage.initStorage()

console.log('Додаємо задачі:')
const task1 = taskService.addTask('Купити хліб')
const task2 = taskService.addTask('Поспати')
const task3 = taskService.addTask('Вивичити Node.js')

console.log('Додано', task1.title);
console.log('Додано', task2.title);
console.log('Додано', task3.title);

fileStorage.saveTasks(taskService.getTasks())

console.log('Список задач:')
taskFormatter.showTasksList(taskService.getTasks())

console.log('Задачі, прочитані з файлу')
const tasksFromFile = fileStorage.readTasks()
taskFormatter.showTasksList(tasksFromFile)
