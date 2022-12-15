import React from 'react'
import { ChevronUp } from "react-bootstrap-icons"

const Footer = () => {
  return (
    <div className='d-flex align-items-center justify-content-between' style={{padding: "20px",fontSize : "1.2rem", height : "10vh",background : "#3c3838", color: "white"}}>
      <span>Copyright &copy; 2022 | All Rights Reserved.</span>
      <ChevronUp style={{color: "whitesmoke", fontSize : "2rem", cursor:"pointer"}}/>
    </div>
  )
}

export default Footer 