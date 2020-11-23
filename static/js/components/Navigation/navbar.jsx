const { useState } = React 
const {Modal, Button, Alert, Dropdown, Container, Navbar, Nav} = ReactBootstrap
const {SettingsIcon, SvgIcon, ExitToAppIcon} = MaterialUI

function NavBar({setUser, user, alertColor, setAlertColor, alertStatus, setAlertStatus}){
    const [showAlert, setShowAlert] = useState(false)

    // const {user, alertColor, setAlertColor, alertStatus, setAlertStatus} = useContext(UserContext);

    const handleLogout = () => {

      fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user
        })
      })
      setUser(null)
      setShowAlert(false)
      localStorage.removeItem('user_id')
    }

    if (user){
      return <NavBarUser handleLogout={handleLogout} user={user}/>
    } else {
      return (
        <div>
            <NavBarNoUser setUser={setUser} setAlertColor={setAlertColor} 
              setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> 
              : null}
        </div> )
    }
}


function NavBarNoUser({setUser, setShowAlert, setAlertStatus, setAlertColor}){
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterClose = () => setShowRegister(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleRegisterShow = () => setShowRegister(true);

  return (
    <div>
      <Navbar expand="lg" className="fixed-top navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/home" className="navbar-brand">Joyride</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">  
              <Nav className="ml-auto">
                <Nav.Link><button className="btn btn-theme" onClick={handleLoginShow}>Log In</button>
                </Nav.Link>
                <Nav.Link><button className="btn btn-theme" onClick={handleRegisterShow}>Sign Up</button></Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LogInModal setUser={setUser} handleLoginClose={handleLoginClose} showLogin={showLogin} 
        setShowAlert={setShowAlert} setAlertStatus={setAlertStatus} setAlertColor={setAlertColor}/>
      <RegisterModal handleRegisterClose={handleRegisterClose} showRegister={showRegister} 
        setShowAlert={setShowAlert} setAlertStatus={setAlertStatus} setAlertColor={setAlertColor} />
    </div>
  )
}

function NavBarUser({handleLogout, user}){
  return (
    <Navbar expand="lg" className="fixed-top navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="navbar-brand">Joyride</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/search" className="btn navbar-btn shadow-none">Search</Nav.Link>
              <Nav.Link as={Link} to="/post" className="btn navbar-btn shadow-none">Post</Nav.Link>
            </Nav>
            <Nav className="ml-auto">       
                <Dropdown>
                  <Dropdown.Toggle variant="info" className="mr-1" id="rides-dropdown">
                    My Rides
                  </Dropdown.Toggle>
                  <Dropdown.Menu> 
                    <Dropdown.Item><Link to="/current-rides">Current Rides</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/past-rides">Past Rides</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="info">
                  <i className="fas fa-bell white-icon"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu> 
                    <Dropdown.Item style={{width: '400px'}}><Notifications colSize="2"/></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link as={Link} to={`/profile/${user}`} className="btn navbar-btn shadow-none">
                  <i className="fas fa-home white-icon"></i>
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="btn navbar-btn shadow-none" onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>
         </Navbar.Collapse>
      </Container>
    </Navbar> 
  )
}


  