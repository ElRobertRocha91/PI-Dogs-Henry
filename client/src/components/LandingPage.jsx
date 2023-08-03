import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage () {
    return(
        <div>
            <h1>Welcome to my app</h1>
            <Link to='/home'>
                <button>to enter</button>
            </Link>
        </div>
    )
}