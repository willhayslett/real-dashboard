

const enableDashboardEdit = () => {
  const cardOptions = document.getElementsByName("cardOptions");
  for (let i = 0; i < cardOptions.length; i++) {
    if (cardOptions[i].classList.contains("d-none")) {
      cardOptions[i].classList.remove("d-none");
    } 
  }
}

export default function Navbar({ setSidebarToggle, setDrawerOpen }) {
  return (
    <>
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <button onClick={() => { setSidebarToggle(true) }} style={{color: '#9A9D9E'}} id="offCanvasMenu" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            {/* <i className="navbar-toggler-iconbi bi-list"></i> */}
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="dropstart float-end">
            <i data-bs-toggle="dropdown" aria-expanded="false" className="bi bi-gear" style={{fontSize: '2rem', color: '#9A9D9E'}}></i>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
              <li><a id="grid-builder-toggle" onClick={setDrawerOpen} className="dropdown-item" href="#">Add New Widget</a></li>
              <li><a id="backgroundImageButton" onClick={enableDashboardEdit} className="dropdown-item" href="#">Edit Dashboard</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}