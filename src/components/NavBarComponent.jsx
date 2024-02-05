import React from 'react';

const NavBarComponent = () => {

    const goToSettings = () => {
        console.log('go to settings');
    }

    return (
            <nav className="bg-slate-800 flex justify-between items-center relative top-0 w-full h-16 p-4">
                <img className='' src='/AppImages/android/android-launchericon-48-48.png'/>
                <img className="h-16" src='/tricount_name.png'/>
                <div className="flex flex-col space-y-1 pr-2" onClick={goToSettings}>
                    <div className='h-2 w-2 border rounded-full bg-white'></div>
                    <div className='h-2 w-2 border rounded-full bg-white'></div>
                    <div className='h-2 w-2 border rounded-full bg-white'></div>

                </div>
                
                
                
            </nav>
    );
    }

    export default NavBarComponent;