const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const tasksRoutes = require('./routes/tasks')

const app = express()
const port = 8000

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use(bodyParser.json())

const mongo_uri = 'mongodb://localhost/todo-app';
mongoose.connect('mongodb+srv://admin:admin@cluster0-giaiv.mongodb.net/test?retryWrites=true&w=majority', (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Succesfully connected to ${mongo_uri}`)
  }
})

app.get('/api/home', (req, res) => res.json({
  message: 'hellou'
}))

app.use('/api', tasksRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))