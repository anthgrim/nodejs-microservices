import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    if (content.trim() === '') {
      return alert('Comment cannot be empty')
    }

    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, {
        content
      })
      setContent('')
    } catch (error) {
      console.log(error)
      return alert('Something went wrong')
    }
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor=''>New Comment</label>
          <input
            className='form-control'
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <br />
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate
