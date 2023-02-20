import React from 'react'

const CommentsList = ({ comments }) => {
  const commentsList = comments.map((comment) => {
    const content =
      comment.status === 'pending'
        ? 'Comment under review'
        : comment.status === 'rejected'
        ? 'Comment Rejected'
        : comment.content

    return <li key={comment.id}>{content}</li>
  })

  return <ul>{commentsList}</ul>
}

export default CommentsList
