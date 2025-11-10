import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
   let navigate=useNavigate()
    function to() {
        navigate('/photo')
    }
    
  return (
    <div>
        <button onClick={to} className='p-4 border mt-5 ml-5 cursor-pointer'>to</button>
    </div>
  )
}

export default Home