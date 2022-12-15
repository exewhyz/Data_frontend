import React from 'react'
import ScrollButton from './ScrollButton';

const Footer = () => {

  return (
    <div className='d-flex align-items-center justify-content-between' style={{padding: "20px",fontSize : "1.2rem", height : "10vh",background : "#3c3838", color: "white"}}>
      <span>Copyright &copy; 2022 | All Rights Reserved.</span>
      <ScrollButton />
    </div>
  )
}

export default Footer 