const { useState } = React 
const {Modal, Button, Alert} = ReactBootstrap

function NavBar({setUser, user}){
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [alertColor, setAlertColor] = useState(false)
    const [alertStatus, setAlertStatus] = useState("")
    const handleLoginClose = () => setShowLogin(false);
    const handleRegisterClose = () => setShowRegister(false);
    const handleLoginShow = () => setShowLogin(true);
    const handleRegisterShow = () => setShowRegister(true);
    const handleLogout = () => {
      setUser(null)
      setShowAlert(false)
      localStorage.removeItem('user_id')
      console.log('user', user)
    }
    if (user){
      return <NavBarUser handleLogout={handleLogout}/>
    } else {
      return (
        <div>
            <NavBarNoUser handleLoginShow={handleLoginShow} handleRegisterShow={handleRegisterShow}/>
            <LogInModal setUser={setUser} handleLoginClose={handleLoginClose} showLogin={showLogin} setShowAlert={setShowAlert} setAlertStatus={setAlertStatus} setAlertColor={setAlertColor}/>
            <RegisterModal handleRegisterClose={handleRegisterClose} showRegister={showRegister} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert} setAlertColor={setAlertColor} />
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
        </div> )
    }
}

function UserAlert({text, setShowAlert, color}){
  return (
    <Alert className = "alert-position" variant={color} onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>{text}</Alert.Heading>
   </Alert>
  )
}

function NavBarNoUser({handleLoginShow, handleRegisterShow}){
  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-custom">
      <div className="container">
          <Link to="/post" className="navbar-brand">Joyride</Link>
          <ul className="navbar-nav">
              <li className="nav-item">
              <Button className="btn-theme" onClick={handleLoginShow}>Log In</Button>
              </li>
              <li className="nav-item">
              <Button className="btn-theme" onClick={handleRegisterShow}>Sign Up</Button>
              </li>
          </ul>
      </div>
    </nav>
  )
}

function NavBarUser({handleLogout}){
  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-custom">
      <div className="container">
        <a className="navbar-brand" href="/">Joyride</a>
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/search" className="btn navbar-btn shadow-none">Search</Link>
        </li>
        <li className="nav-item">
          <Link to="/post" className="btn navbar-btn shadow-none">Post</Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div className="dropdown">
            <button className="btn dropdown-toggle shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown">
              My Rides
            </button>
            <div className="dropdown-menu">
              <Link to="/current-rides" className="dropdown-item">Current Rides</Link>
              <a className="dropdown-item" href="/past-rides">Past Rides</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <Link to="/search" className="btn navbar-btn shadow-none">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="btn navbar-btn shadow-none" onClick={handleLogout}>Log Out</Link>
        </li>
      </ul>
      </div>
    </nav>  
  )
}

function LogInModal({setUser, showLogin, handleLoginClose, setShowAlert, setAlertStatus, setAlertColor}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/process-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setEmail("")
            setPassword("")

            setShowAlert(true)
            setAlertStatus(data.msg)
            setAlertColor("danger")
            if (data.user_id){
              setUser(data.user_id) 
              localStorage.setItem('user_id', data.user_id) 
            } 
        })
    }
    return (
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>USER LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={handleSubmit}>
              <div className="input-group input-group-lg mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group input-group-lg mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
                </div>
                <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>     
              <div className="form-group mb-4">
                <button type="submit" className="btn btn-theme form-control" onClick={handleLoginClose}>Login</button> 
              </div>  
          </form>
        </Modal.Body>
      </Modal>
    )
  }

  function RegisterModal({showRegister, handleRegisterClose, setAlertStatus, setShowAlert, setAlertColor}){
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const handleRegistration = (e) => {
        e.preventDefault()
        fetch("/process-signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.msg)
            setFirstName("")
            setLastName("")
            setEmail("")
            setPhoneNumber("")
            setPassword("")
            setConfirmPassword("")
            setShowAlert(true)
            setAlertStatus(data.msg)
            if (data.success){
              setAlertColor("success")
            } else {
              setAlertColor("danger")
            }
        })
    }
      return(
        <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>USER SIGNUP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleRegistration} method="post">
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="First Name" name="f_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="Last Name" name="l_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-envelope"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-phone"></i></span>
              </div>
              <input type="tel" className="form-control" name="phone" placeholder="8888888888" pattern="\d{10}" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Re-enter Password" name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </div>  
          <div className="form-group mb-4">
              <button type="submit" className="btn btn-theme form-control" onClick={handleRegisterClose}>Signup</button> 
          </div> 
        </form>
        </Modal.Body>
      </Modal>
    )
  }