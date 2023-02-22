import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  try {
    axios.post('http://localhost:4000/events', event) // POSTS
  } catch (error) {
    console.log('Unable to connect to Post Service')
  }

  try {
    axios.post('http://localhost:4001/events', event) // COMMENTS
  } catch (error) {
    console.log('Unable to connect to Comments Service')
  }

  try {
    axios.post('http://localhost:4002/events', event) // QUERY
  } catch (error) {
    console.log('Unable to connect to Query Service')
  }

  try {
    axios.post('http://localhost:4003/events', event) // MODERATION
  } catch (error) {
    console.log('Unable to connect to Moderation Service')
  }

  res.send({
    status: 'OK'
  })
})

app.get('/events', (req, res) => {
  res.send(events)
})

process.on('uncaughtException', (err) => console.log(err))

app.listen(4005, () => {
  console.log('Listening on 4005')
})
