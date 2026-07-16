const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req,res,next)=>{
  const time = new Date().toLocaleString('uk-UA')
  console.log(req.method, req.url, '—', time);
  next();
});

app.get('/',(req,res)=>{
  res.send('Main page')
})

app.get('/profile', (req, res) => {
  res.render('profile', {
    name: 'Your name',
    role: 'Student',
    hobbies: ['reading','writeing', 'swimming'],
    isOnline: false,
  })
})

app.get('/students',(req,res)=>{
  const students = [
    { name: 'Оля', level: 'junior' },
    { name: 'Максим', level: 'middle' },
    { name: 'Ірина', level: 'senior' },
    { name: 'Катя', level: 'senior' }
  ];
  
  res.render('students', {students})
})

app.get('/*splat',(req,res)=>{
  res.status(404).render('not-found', { url: req.url })
})

app.listen(3000,()=>{
  console.log('Server started on port 3000')
})