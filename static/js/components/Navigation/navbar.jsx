function NavBar(){

    const [showAlert, setShowAlert] = useState(false)
    const {user, alertColor, alertStatus} = useContext(UserContext)

    if (user){
      return <NavBarUser setShowAlert={setShowAlert}/>
    } else {
      return (
        <React.Fragment>
            <NavBarNoUser setShowAlert={setShowAlert}/> 
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> 
              : null}
        </React.Fragment> )
    }
}

// const {user, alertStatus, alertColor, setUser, setAlertStatus, setAlertColor} = useContext(UserContext)

function NavBarNoUser({setShowAlert}){

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterClose = () => setShowRegister(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleRegisterShow = () => setShowRegister(true);

  return (
    <React.Fragment>
      <Navbar expand="lg" className="fixed-top navbar-custom py-0">
        <Container>
          <Navbar.Brand as={Link} to="/home" className="navbar-brand">Joyride</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">  
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/about" className="text-white">About</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link><button className="btn btn-theme" onClick={handleLoginShow}>Log In</button>
                </Nav.Link>
                <Nav.Link><button className="btn btn-theme" onClick={handleRegisterShow}>Sign Up</button></Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LogInModal handleLoginClose={handleLoginClose} showLogin={showLogin} 
        setShowAlert={setShowAlert}/>
      <RegisterModal handleRegisterClose={handleRegisterClose} showRegister={showRegister} 
        setShowAlert={setShowAlert}/> 
    </React.Fragment>
  )
}



function NavBarUser({setShowAlert}){

  const {user, setUser} = useContext(UserContext)

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
                    <Dropdown.Item as={Link} to="/current-rides">Current Rides</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/past-rides">Past Rides</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="info">
                    <i className="fas fa-bell white-icon"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu> 
                    <Dropdown.Item style={{width: '350px'}}><Notifications colSize="2"/></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>     
                {/* <Nav.Link as={Link} to='/all-messages'>
                  <i className="far fa-comments white-icon"></i>
                </Nav.Link> */}
                <Nav.Link as={Link} to={{ pathname: `/messages/${user}`, 
                      state: {otherUserId: user, 
                      otherUserName: ["My", "Inbox"]} }}>
                  <i className="far fa-comments white-icon"></i>
                </Nav.Link>
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


  