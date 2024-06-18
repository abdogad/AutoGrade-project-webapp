import React from 'react'
import { Link } from 'react-router-dom'

export default function MainPage() {
  return (
    <div className="login vh-100   d-flex justify-content-center   ">
        <div className=" container     row   justify-content-center align-items-center         " >
            <div className="block text-center    rounded-bottom py-5 px-5  ">

            <h2>Please choose one</h2>
            
       
       
            <div className='d-flex flex-column ' >
            {/* <div class="box-1 py-3 ">
                <div class="btn btn-one bg-danger px-5 ">
                   <Link to="" ><span>Edit</span></Link> 
                </div>
            </div> */}
            <div class="box-2 py-3">
                <div class="btn btn-one bg-success px-5">
                <Link to="/create" ><span>Create</span></Link>
                </div>
            </div>
            <div class="box-3 py-3">
                <div class="btn btn-one bg-primary px-5">
                <Link to="/history" ><span>Show</span></Link>
                </div>
            </div>
                
            </div>
              
            {/* <a href='/' className='px-3 mt-2 mx-2  w-50  '>Forgot password</a>   */}
            </div>
        </div>
    </div>
  )
}
