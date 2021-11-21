import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ AuthService }) => {
    const navigate = useNavigate();
    const goHome = userId => {
        navigate('/home', {
            state: { id: userId },
        })
    }
    useEffect(() => {
        AuthService
            .onAuthChange(user => {
                user && goHome(user.uid)
            })
    });
    const onLogin = (event) => {
        event.preventDefault();
        AuthService//
            .onLogin()
            .then(data => console.log(data));
    }
    return (
        <span onClick={onLogin}> Auth </span>
    );
}

export default Auth;