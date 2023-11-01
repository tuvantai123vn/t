import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";

function LoginLink(props) {
	const cookies = new Cookies();

	const onRedirect = () => {

		axios.delete('http://localhost:5001/auth/logout', { withCredentials: true })
		.then((response) => {
			cookies.remove('accessToken');
		  })
		  .catch((error) => {
			console.log(error);
		  });
		
	};

	return (
		<li className='nav-item' onClick={onRedirect}>
			<Link className='nav-link' to='/signin'>
				( Logout )
			</Link>
		</li>
	);
}

export default LoginLink;
