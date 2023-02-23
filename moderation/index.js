import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  console.log('Event Received:', type)

  if (type === 'CommentCreated') {
    const { content } = data

    const status = content.includes('orange') ? 'rejected' : 'approved'

    setTimeout(async () => {
      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data: { ...data, status }
      })
    }, 5000)
  }

  res.send({})
})

app.listen(4003, () => {
  console.log('Listening on 4003')
})
