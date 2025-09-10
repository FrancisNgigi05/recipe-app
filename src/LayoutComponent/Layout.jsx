import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { Home, PlusCircle, User } from 'lucide-react';
import './Layout.css'

function Layout() {
  return (
    <div className='app-layout'>
        <div className='conent'>
            <Outlet />
        </div>

        <nav className='bottom-nav'>
            <NavLink to='/' className="nav-item"><Home size={24}/></NavLink>
            <NavLink to='/add' className='nav-item'><PlusCircle size={24}/></NavLink>
            <NavLink to='' className='nav-item'><User size={24}/></NavLink>
        </nav>
    </div>

  )
}

export default Layout;
