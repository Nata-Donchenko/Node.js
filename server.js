const http = require('http')

const taskService = require('./modules/taskService')
const fileStorage = require('./modules/fileStorage')

function getFilteredTasks(status) {
  const tasks = taskService.getTasks()

  if(status === 'completed') {
    return tasks.filter((task) => task.completed === true)
  }else if(status === 'active') {
    return tasks.filter((task) => task.completed === false)
  }else {
    return tasks
  }
}

fileStorage.initStorage()
taskService.loadTasks(fileStorage.readTasks())

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`)

  if (req.method === 'GET' && parsedUrl.pathname === '/') { 
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<h1>Study Task Tracker API</h1>')
  }

  if(req.method === 'GET' && parsedUrl.pathname === '/tasks') {
    const status = parsedUrl.searchParams.get('status')
    const result = getFilteredTasks(status)

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result, null, 2))
  }

  if(req.method === 'GET' && parsedUrl.pathname.startsWith('/tasks/')) {
    const array = parsedUrl.pathname.split('/')
    const id = +(array[2]);
    const allTasks = taskService.getTasks()
    const task = allTasks.find((task) => task.id === id)
  
    if(!task) {
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({ error: 'Task not found'}))
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(task, null, 2))
    }
  }

  if(req.method === 'POST' && parsedUrl.pathname === '/tasks') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      const parsedBody = JSON.parse(body)
      const task = taskService.addTask(parsedBody.title)
  
      fileStorage.saveTasks(taskService.getTasks())

      res.writeHead(201, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(task, null, 2))
    })
  }

})

server.listen(3000, () => {
  console.log('Сервер запущено на порту 3000')
})





