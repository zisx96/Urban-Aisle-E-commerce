import React, { Children, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '../../Utils/jwt-helper';

const PRoute = ({children}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!isTokenValid()){
            navigate("/v1/login")
        }
    },[navigate]);

  return (
    <div>
        {children}
    </div>
  )
}

export default PRoute