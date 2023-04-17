import React, { useState } from 'react'
import {emailIsValid} from '../helperss/Helper'

function Newsletter() {

    const[email,setEmail]=useState('');
    const [error,setError]=useState()


    const handleEmail = (e)=> {

        setEmail(e.target.value);

        if (emailIsValid(e.target.value)){
            setError('')
            e.target.style.borderColor='green'
        }else {
            setError('Email is not Valid')

            e.target.style.borderColor='red'
        }
    }


    const handleSubmit = () => {
        if (error.length===0) {
            const ls_emails = localStorage.getItem('emails')
            const emails= (ls_emails !== null) ? JSON.parse (ls_emails) :[]
            
            if(emails.length > 0 && emails.includes(email)){
                setError('Email address already exists !')
                return;
            }
            

            if(emails.length > 0) {
                localStorage.setItem('emails',JSON.stringify([...emails,email]))
            }else{
                localStorage.setItem('emails',JSON.stringify([email]))
            }
            setEmail('')
            document.getElementById('email').value=''
        }
    }

  return (
    <div className="newsletter">
        <h2> Newsletter</h2>
        <input type="text" id="email" placeholder="enter your email ...."  onKeyUp={handleEmail}/> 
        <button onClick={handleSubmit}>SUBSCRIBE</button>
    {error && <div>{error}</div>}
    </div>
  )
}

export default Newsletter