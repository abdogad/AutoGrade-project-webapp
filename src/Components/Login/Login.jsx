import React from 'react'
import "./login.css"
// import "./logg.scss"
export default function Login() {
  return (
   
    <div className='py-5 container containerr px-3'>
    
 <div className="signUp p-5 rounded">
     <h3 className='py-3'>Login to your account</h3>
      
     <form action="" className='d-flex flex-column' >

<div className='py-1'>
<label htmlFor="" className='py-3'>  email  </label>
<input type="email"  name="email" id="email" className='w-100 rounded px-4' placeholder='Enter Your Email' />
</div>

<div className='py-1'> 
<label htmlFor="" className='py-3'>  password  </label>
<input type="password"   name="password" id="password" className='w-100 rounded px-4' placeholder='Enter Your Password' />
</div>
     <div className="button py-4  ">
         <button className='py-3 px-4 border-0 rounded'>Log in</button>
     </div>
    
     </form>
     <p>

     <h6 className='px-2' >Don't have an account?</h6><span > Sign up </span>
     </p>
 </div>
</div>
  )
}
