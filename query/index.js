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

  if (type === 'PostCreated') {
    const { id, title } = data
    posts[data.id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { postId, id, content } = data
    posts[postId].comments.push({ id, content })
  }

  console.log(posts)

  res.send({})
})

app.listen(4002, () => {
  console.log('Listening on 4002')
})
