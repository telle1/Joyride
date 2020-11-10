const { useState } = React 
const {Modal, Button, Alert} = ReactBootstrap

function NavBar({setUser, user}){
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showAlert, setShowAlert] = useState(true)
    const handleLoginClose = () => setShowLogin(false);
    const handleRegisterClose = () => setShowRegister(false);
    const handleLoginShow = () => setShowLogin(true);
    const handleRegisterShow = () => setShowRegister(true);
    const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('user_id')
      console.log('user', user)
    }

    if (user){
      return <NavBarUser handleLogout={handleLogout}/>
    } else {
      return (
        <div>
            <NavBarNoUser handleLoginShow={handleLoginShow} handleRegisterShow={handleRegisterShow}/>
            <LogInModal setUser={setUser} handleLoginClose={handleLoginClose} showLogin={showLogin}/>
            <RegisterModal handleRegisterClose={handleRegisterClose} showRegister={showRegister} />
            {/* <LoginAlert text="hi"/> */}
        </div> )
    }
}

function LoginAlert({text, setShowAlert}){
  return (
    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        {text}
      </p>
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

function LogInModal({setUser, showLogin, handleLoginClose}){
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
            if (data.user_id){
              setUser(data.user_id)
              localStorage.setItem('user_id', data.user_id) //store instate?
              //console.log(localStorage.getItem('user_id'))
            }
        })
    }
    return (
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>USER LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" onClick={handleSubmit}>
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

  function RegisterModal({showRegister, handleRegisterClose}){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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
            console.log(data.msg)
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
              <input type="text" className="form-control" placeholder="First Name" name="f_name" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="Last Name" name="l_name" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-envelope"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="Email" name="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-phone"></i></span>
              </div>
              <input type="tel" className="form-control" id="phone" name="phone" placeholder="8888888888" pattern="\d{10}" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Password" name="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="input-group input-group-lg mb-4">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Re-enter Password" name="confirmpassword" id="confirmpassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>  
          <div className="form-group mb-4">
              <button type="submit" className="btn btn-theme form-control" id="submit-button" onClick={handleRegisterClose}>Signup</button> 
          </div> 
          <p id = "alert-pw" className='text-center'></p>
        </form>
        </Modal.Body>
      </Modal>
    )
  }