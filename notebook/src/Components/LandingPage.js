import React from 'react'
import picture1 from './picture1.png'
import picture2 from './picture2.png'
import picture3 from './picture3.png'
export const LandingPage = () => {
  return (
    <div>
        <div className="container" style={{textAlign:"center"}}>
            <h1 className='heading'>Got something on your mind?</h1>
            <h1 className='heading'>Note it down.</h1>
            <h2 className='my-2'>All your notes at one place.</h2>
        </div>
        {/* <div className="d-flex flex-row "> */}
        <div className="landingpage">
        <img src={picture1} alt="NOTEBOOK" style={{height:"28rem", width:"28rem"}}/>
        <img src={picture2} alt="NOTEBOOK" style={{height:"28rem", width:"28rem"}}/>
        <img src={picture3} alt="NOTEBOOK" style={{height:"28rem", width:"28rem"}}/>
        </div>

        <section>
            <div className="container footer">Copyright © 2022 VanshikaMohindra | All rights reserved</div>
        </section>
    </div>
  )
}
