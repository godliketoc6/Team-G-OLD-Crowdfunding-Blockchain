import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">G(OLD)</a>
      </div>
      <div>
        <input type="text" placeholder="Search" className="input input-md input-bordered w-full max-w-xs" />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a className='text-lg'>Sign up</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar