import React, { useState } from 'react'
import {FaArrowCircleUp} from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { Button } from './style';
import { Container } from './styles'


const Result =()  =>{
    return (
        <p>Successfully sent, i will contact you soon!!!</p>
    )
}

export default function Contact() {
    const [result, showResult] = useState(false)
    const [visible, setVisible] = useState(false)
    
    const sendEmail = (e : any) => {
        e.preventDefault();
        emailjs.sendForm('service_i3hm0fo', 'template_dyh00n3', e.target, 'user_gW9TUWQZjoCki5des3Nks')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
        showResult(true);
    };
      setTimeout(()=>{
          showResult(false)
      },5000);

      const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 2700){
          setVisible(true)
        } 
        else if (scrolled <= 2700){
          setVisible(false)
        }
      };
      
      const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };
      
      window.addEventListener('scroll', toggleVisible);

  return (

    <Container>
        <div className="h">

         <div className="contact-containter">
         <div className="contact-header">
            <h1>Contact Me</h1>
            <p>Lets keep in Touch</p>
            <div className="underline"></div>
            <div className="inTouch">
                <div className="touch">
                    <div className="contact-liner">
                        <h1>Get In Touch</h1>
                    </div>
                <div className="onMove">
                    <div className="move">
                    <form action="" onSubmit={sendEmail}>
                    <div className="formWord">
                        <span>Full Name</span>
                        <br />
                        <input className="input100"type="text" name="fullName" placeholder="Your name.." required />
                        <br />
                        <span>Phone Number</span>
                        <br />
                        <input className="input100" type="tel" name="phone" placeholder="+0800000000" required />
                        <br />
                        <span>Enter Email</span>
                        <br />
                        <input className="input100" type="text" name="email" placeholder="vascoeti@gmail.com" required />
                        <br />
                            <span>message</span>
                        <br/>
                        <textarea name="message" required></textarea>
                        <button className="send"> Send<FaPaperPlane className="fa"></FaPaperPlane></button>
                        <p className="rows">
                            {
                                result ? <Result/> : null
                            }
                        </p>
                         </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Button>
            <FaArrowCircleUp onClick={scrollToTop} 
            style={{display: visible ? 'inline' : 'none'}} />
        </Button>
    </div>
</div>
    </Container>
  )
}