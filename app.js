const taskService = require('./modules/taskService')
const taskFormatter = require('./modules/taskFormatter')
const fileStorage = require('./modules/fileStorage')
const systemInfo = require('./modules/systemInfo')
const { emitter } = require('./modules/eventLogger')

fileStorage.initStorage()

emitter.emit('appStarted')

systemInfo.showSystemInfo()

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

console.log('Позначення виконаної (id=1)');
taskService.completeTask(task1.id);

console.log('Видаляємо задачу (id=2) ');
const deleted = taskService.deleteTask(task2.id);
console.log(deleted ? 'Задачу видалено' : 'Задачу не знайдено');

console.log('Список задач після змін:');
taskFormatter.showTasksList(taskService.getTasks());