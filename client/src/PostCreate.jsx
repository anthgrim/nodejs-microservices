import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {
  const [title, setTitle] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    if (title.trim() === '') {
      return alert('Title must be a non-empty string')
    }

    try {
      await axios.post('http://localhost:4000/posts', {
        title
      })

      setTitle('')
    } catch (error) {
      console.log(error)
      return alert('Something went wrong')
    }
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor=''>Title</label>
          <input
            className='form-control'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
