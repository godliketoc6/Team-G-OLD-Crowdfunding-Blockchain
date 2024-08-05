import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href='/'>G(OLD)</a>
      </div>
      <div className='flex space-x-2'>
        <div>
          <input type="text" placeholder="Search" className="input input-md input-bordered w-full max-w-xs" />
        </div>
        <div className="flex-none">
          <button
            className="btn btn-md btn-primary text-lg"
            onClick={handleSignUpClick}
          >Sign up</button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar