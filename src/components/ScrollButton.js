import React from 'react';
import { ChevronUp } from "react-bootstrap-icons"

const ScrollButton = () =>{

const scrollToTop = () =>{
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	});
};

return (
	<ChevronUp onClick={scrollToTop}/>
);
}

export default ScrollButton;
