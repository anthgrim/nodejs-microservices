import express from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()

const commentsByPostId = {}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send('Bad Request')
  }

  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body

  const commentPayload = { id: commentId, content, status: 'pending' }

  const comments = commentsByPostId[id] || []
  comments.push(commentPayload)

  commentsByPostId[id] = comments

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { ...commentPayload, postId: id }
  })

  res.status(201).send(comments)
})

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  console.log('Received Event:', type)

  if (type === 'CommentModerated') {
    const { postId, id, status } = data

    const comments = commentsByPostId[postId]

    const comment = comments.find((comment) => comment.id === id)
    comment.status = status

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data
    })
  }

  res.send({})
})

app.listen(4001, () => {
  console.log('Listening on 4001')
})
