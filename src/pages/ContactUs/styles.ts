import styled from 'styled-components'; 

export const Container = styled.div`
.h{
    
    height: 800px;
    padding-top:20px;
}
.contact-containter .contact-header h1{
    text-align: center;
    font-size: 50px;
    font-family: cursive;
   
}
.contact-header p{
    text-align: center;
    font-size: 19px;
    font-family: "Poppins Light";
   
}
.inTouch{
    width:1000px;
    height: 600px;
    padding:20px;
    margin: 30px auto;
    border-radius:40px;
    box-shadow: 0px 0px 15px 2px #ff5823;

    
}
.contact-containter .contact-liner h1{
    text-align: left;
    font-weight: 1000;
}
.colz-icons {
    color: white;
    padding: 10px;
    padding-left: 7px;
    margin-right: 20px;
    
}
 .colz-icons:hover {
    transform: scale(1.5)
}
.formWord{

    font-weight: 1000;
    height:550px;
}

.onMove{
    min-height: 50vh;
    display: grid;
    place-items: center;
}
.move{
    width:60vh;
    height:75vh;
    max-width: var(--fixed-width);
}
.formWord{
    background: var(--clr-primary-1);
    padding: 1.5rem 2rem;
    border-radius: 20px;
    box-shadow: var(--light-shadow);
    transition: var(--transition);
    font-size: 18px;
}
.formWord input{
    background: white;
    width: 100%;
    height: 50px;
    border-radius:7px;
    font-size: 18px;
}

.formWord textarea{
    background:white;
    width: 100%;
    height: 130px;
    border-radius: 7px;
}
.formWord .send{
    color: var(--white);
    font-size: 15px;
    background-color: #ff5823;
}
.send{
    border-radius: 20px;
    padding: 10px 0;
    width: 150px;
    font-family: "Poppins SemiBold";
    font-size:12px;
}
.send:hover{
    background-color: cornsilk;
    color:#111;
}
.rows p{
    color: green;
    font-size:15px;
}

@media screen and (max-width: 1280px){
    .inTouch{
        padding:20px;
        margin: 30px auto;
        height: 650px;
        width:1100px;
    }
    .formWord{
        height: 500px;
        width: 450px;
    }
    .onMove{
        min-height: 30vh;
    }
    .move{
        height:45vh;
    }
    .send{
        width: 130px;
        padding: 8px 0;    
    }   
}


@media screen and (max-width: 1025px){
    .inTouch{
        padding:20px;
        margin: 20px auto;
        height:580px;
        width:900px;   
    }
    .formWord{
        height: 397px;
        width: 397px;
    }
  
    .onMove{
        min-height: 35vh;
    }
    .move{
        height:30vh;
    }
    .formWord input{
        height: 35px;
    }
    .formWord textarea{
        height:70px;
    }
    
}
@media screen and (max-width: 768px){
    .inTouch{
        padding:20px;
        margin: 30px auto;
        height: 510px;
        width:530px;   
    }
    .formWord{
        height:340px;
        width:300px;
    }
    .onMove{
        min-height: 35vh;
    }
    .move{
        height:30vh;
    }
    .formWord input{
        height: 27px;
    }
    .formWord textarea{
        height:50px;
    }
    .send{
        width: 100px;
        padding: 6px 0;
    }
}
@media screen and (max-width: 490px){
    .inTouch{
        padding:20px;
        margin: 30px auto;
        height: 450px;
        width:350px;   
    }
    .contact-containter .contact-liner h1{
        font-size: 40px;
    }
    .formWord{
        height:300px;
        width:290px;
    }
  
    .onMove{
        min-height: 20vh;
    }
    .move{
        height:30vh;
    }
    .formWord input{
        height: 27px;
    }
    .formWord textarea{
        height:50px;
    }
    .send{
        width:90px;
        padding: 6px 0;      
    }
}

@media screen and (max-width: 360px){
    .inTouch{
        padding:20px;
        margin: 30px auto;
        height: 450px;
        width:350px;   
    }
    .contact-containter .contact-liner h1{
        font-size: 35px;
    }
    .formWord{
        height:300px;
        width:290px;
    }
  
    .onMove{
        min-height: 20vh;
    }
    .move{
        height:30vh;
    }
    .formWord input{
        height: 27px;
    }
    .formWord textarea{
        height:50px;
    }
    .send{
        width:90px;
        padding: 6px 0;      
    }
    
}
`