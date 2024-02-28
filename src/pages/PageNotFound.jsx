import React from 'react';
import tricount from '../assets/tricount.png';

const PageNotFound = () => {
    return (
        
            <div className="flex flex-col items-center justify-center h-screen bg-zinc-900">
                <img src={tricount} alt="404" className="h-80" />
                <span className="text-white text-5xl">Page not found</span>
            </div>
       
    );
}

export default PageNotFound;