import React from 'react'

const CommentsList = ({ comments }) => {
  const commentsList = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>
  })

  return <ul>{commentsList}</ul>
}

export default CommentsList
