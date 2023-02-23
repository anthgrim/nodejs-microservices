import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data
    posts[data.id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { postId } = data
    posts[postId].comments.push({ ...data })
  }

  if (type === 'CommentUpdated') {
    const { postId, id } = data
    const comments = posts[postId].comments.map((comment) => {
      if (comment.id === id) {
        comment = data
      }
      return comment
    })

    posts[postId].comments = comments
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body
  console.log('Received Event:', type)

  handleEvent(type, data)

  console.log(posts)

  res.send({})
})

app.listen(4002, async () => {
  console.log('Booting up service')

  const res = await axios.get('http://event-bus-srv:4005/events')
  console.log(res.data)
  const events = res.data

  for (let event of events) {
    console.log('Processing event:', event.type)
    handleEvent(event.type, event.data)
  }
  console.log('Service reboot completed')
  console.log('Listening on 4002')
})
