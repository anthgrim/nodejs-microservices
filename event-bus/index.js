import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  axios.post('http://posts-clusterip-srv:4000/events', event) // POSTS
  // axios.post('http://localhost:4001/events', event) // COMMENTS
  // axios.post('http://localhost:4002/events', event) // QUERY
  // axios.post('http://localhost:4003/events', event) // MODERATION

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
