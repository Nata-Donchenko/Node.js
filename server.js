const express = require('express');
const app = express();
const path = require('path');

app.use((req,res,next)=>{
  const time = new Date().toLocaleString('uk-UA')
  console.log(req.method, req.url, '—', time);
  next();
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
  res.send('Main page')
})

app.get('/about',(req,res)=>{
  res.send('About page')
})

app.get('/time',(req,res)=>{
  const time = new Date().toLocaleString('uk-UA')
  res.send(`Time now: ${time}`)
})

app.get('/error',(req,res)=>{
  res.status(500).send('Service error')
})

app.get('/user/:id',(req,res)=>{
  res.send(`User ID: ${req.params.id}`)
})

app.get('/search',(req,res)=>{
  if(!req.query.q){
    return res.status(400).send('No search query specified.')
  } else {
    return res.status(200).send(`Searching ${req.query.q}`)
  }
})

app.get('/user/:id/orders',(req,res)=>{
  const id = req.params.id
  const status = req.query.status
  
  return res.send(`Order user ${id} with status ${status}`)
})

app.post('/feedback',(req,res)=>{
  const {name} = req.body
  
  if(!name){
    return res.status(400).send('This input is required')
  }
  
  res.send(`Thank you ${name}, your message has been received `)
})

app.get('/crashes',(req,res)=>{
  throw new Error('Test error')
})

app.get('/*splat',(req,res)=>{
  res.status(404).send('Page not found')
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(3000,()=>{
  console.log('Server started on port 3000')
})