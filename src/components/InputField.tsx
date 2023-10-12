import React from 'react'
//import <styles className="css"></styles>

const InputField = () => {
  return (
    <form className="input">
        <input type='text' placeholder='Enter a Task' className='input__box'/>
        <button className='input__submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField