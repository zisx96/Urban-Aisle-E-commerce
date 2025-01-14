import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../../Utils/jwt-helper';

const OAuth2Login = () => {

    const navigate = useNavigate();

    useEffect(() =>{
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if(token){
            saveToken(token);
            navigate('/');
        }
        else {
            navigate('/v1/login');
        }
    }, [navigate])

  return (
    <div>OAuth2Login</div>
  )
}

export default OAuth2Login