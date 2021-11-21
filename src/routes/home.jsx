import React from 'react';
import { useLocation } from "react-router-dom";

const Home = () => {
    const { id } = useLocation().state;
    console.log(id)
    return (
        <span> Home </span>
    );
}

export default Home;