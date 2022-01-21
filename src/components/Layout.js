import Navbar from './Navbar'
import Sidebar from './Sidebar'
import React, { useState } from 'react'

export default function Layout({ children, ...props }) {
  const [sideBarOpen, setSidebarToggle] = useState(true);
  
  return (
    <>
      <div id="ascension-dashboard-panel">
        <Navbar setDrawerOpen = {props.setDrawerOpen} sideBarOpen = { sideBarOpen } setSidebarToggle = { setSidebarToggle } />
        <Sidebar sideBarOpen = { sideBarOpen } setSidebarToggle = { setSidebarToggle } />
        <main id="main" style={{marginLeft: sideBarOpen ? 117 : 0, height: '100%'}}>{children}</main>
      </div>
    </>
  )
}