const { useState } = React 
const {Modal, Button, Alert, Dropdown, Container, Navbar, Nav} = ReactBootstrap

function NavBar({setUser, user, alertColor, setAlertColor, alertStatus, setAlertStatus}){
    const [showAlert, setShowAlert] = useState(false)

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
      .then(res => res.json())
      .then(data => {
          console.log(data.msg)
      })

      setUser(null)
      setShowAlert(false)
      localStorage.removeItem('user_id')
    }

    if (user){
      return <NavBarUser handleLogout={handleLogout}/>
    } else {
      return (
        <div>
            <NavBarNoUser setUser={setUser} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
        </div> )
    }
}

// function UserAlert({text, setShowAlert, color}){
//   return (
//     <Alert className = "alert-position" variant={color} onClose={() => setShowAlert(false)} dismissible>
//       <Alert.Heading>{text}</Alert.Heading>
//    </Alert>
//   )
// }

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
          <Navbar.Brand><Link to="/home" className="navbar-brand">Joyride</Link></Navbar.Brand>
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
      <LogInModal setUser={setUser} handleLoginClose={handleLoginClose} showLogin={showLogin} setShowAlert={setShowAlert} setAlertStatus={setAlertStatus} setAlertColor={setAlertColor}/>
      <RegisterModal handleRegisterClose={handleRegisterClose} showRegister={showRegister} setShowAlert={setShowAlert} setAlertStatus={setAlertStatus} setAlertColor={setAlertColor} />
    </div>
  )
}

function NavBarUser({handleLogout}){
  return (
    <Navbar expand="lg" className="fixed-top navbar-custom">
      <Container>
        <Navbar.Brand><Link to="/home" className="navbar-brand">Joyride</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><Link to="/search" className="btn navbar-btn shadow-none">Search</Link>
              </Nav.Link>
              <Nav.Link><Link to="/post" className="btn navbar-btn shadow-none">Post</Link>
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">       
                <Dropdown>
                  <Dropdown.Toggle className="btn-theme" id="rides-dropdown">
                    My Rides
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item><Link to="/current-rides">Current Rides</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/past-rides">Past Rides</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Nav.Link><Link to="/profile" className="btn navbar-btn shadow-none">Profile</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/" className="btn navbar-btn shadow-none" onClick={handleLogout}>Log Out</Link>
                </Nav.Link>
            </Nav>
         </Navbar.Collapse>
      </Container>
    </Navbar> 
  )
}


  