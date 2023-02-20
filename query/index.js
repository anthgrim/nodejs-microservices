import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body
  console.log('Received Event:', type)

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

  console.log(posts)

  res.send({})
})

app.listen(4002, () => {
  console.log('Listening on 4002')
})
