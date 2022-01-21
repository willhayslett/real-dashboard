import styles from './sidebar.module.css'

export default function Sidebar({ setSidebarToggle, sideBarOpen }) {

  return (
    <>
      <div id="mySidenav" className={`text-center`, styles.sidenav} style={{ width: sideBarOpen ? 117 : 0 }}>
        <a href="#" className={`btn btn-primary ${styles.closeButton}`} onClick={() => { setSidebarToggle(false) }}>Close</a>
        {/* <a href="#" className="closebtn" onClick={() => { setSidebarToggle(false) }}>&times;</a>  */}
        <a href="#">
          <button className="btn">
            <i className="bi bi-gear" style={{fontSize: '2rem', color: '#9A9D9E'}}></i>
            <span>Dashboard</span>
          </button>
        </a> 
        <a href="#">
          <button className="btn">
            <i className="bi bi-house" style={{fontSize: '2rem', color: '#9A9D9E'}}></i>
            <span>Rooms</span>
          </button>
        </a> 
        <a href="#">
          <button className="btn">
            <i className="bi bi-pc-horizontal" style={{fontSize: '2rem', color: '#9A9D9E'}}></i>
            <span>Devices</span>
          </button>
        </a> 
        <a href="#">
          <button className="home btn">
            <i className="bi bi-lightbulb" style={{fontSize: '2rem', color: '#9A9D9E'}}></i>
            <span>Lighting</span>
          </button>
        </a>
        <a href="#">
          <button className="home btn">
            <i className="bi bi-collection-play" style={{fontSize: '2rem', color: '#9A9D9E'}}></i>
            <span>Media</span>
          </button>
        </a>
        <a href="#">
          <button className="home btn">
            <i className="bi bi-fingerprint" style={{fontSize: '2rem', color: '#9A9D9E'}}></i>
            <span>Security</span>
          </button>
        </a> 
      </div>
    </>
  )
}