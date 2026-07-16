const express = require('express');
const app = express();

app.get('/',(req,res)=>{
  res.send('Main page')
})

app.get('/about',(req,res)=>{
  res.send('About page')
})

app.get('/time',(req,res)=>{
  const time = new Date().toISOString()
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

app.get('/*splat',(req,res)=>{
  res.status(404).send('Page not found')
})

app.listen(3000,()=>{
  console.log('Server started on port 3000')
})