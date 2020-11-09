const { useState } = React 

function NavBar(){

    const [loginStatus, setLoginStatus] = useState("")
    const [registerStatus, setRegisterStatus] = useState("")
    
    return (
        <div>
            <nav className="navbar navbar-expand-md fixed-top navbar-custom">
                <div className="container">
                    <Link to="/search" className="navbar-brand">Joyride</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <button className="btn navbar-btn shadow-none" data-toggle="modal" data-target="#login">Log In</button>
                        </li>
                        <li className="nav-item">
                        <button className="btn navbar-btn shadow-none" data-toggle="modal" data-target="#signup">Sign Up</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="msg" className="login-register-msg">{loginStatus}{registerStatus}</div>
            <LogInModal setLoginStatus = {setLoginStatus}/>
            <RegisterModal setRegisterStatus = {setRegisterStatus}/>
        </div>
    )
}

function LogInModal({setLoginStatus }){
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
           // $('#login').modal('toggle')
            setLoginStatus(data.msg)
        })
    }
    return (
      <div className="modal fade" id="login">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title w-100 text-center">USER LOGIN</h2>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} method="post">
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
                  <button type="submit" className="btn btn-theme form-control">Login</button> 
                </div>  
              </form>
            </div>
            <div className="modal-footer">
              <p className = "w-100 text-center">Not a member? Sign up <a href="#" data-toggle="modal" data-target="#signup">here</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function RegisterModal({setRegisterStatus}){

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
                confirmPassword: confirmPassword
            })
        })
        .then(res => res.json())
        .then(data => {
           // $('#login').modal('toggle')
            setRegisterStatus(data.msg)
            // console.log(data)
        })
    }


      return(
        <div className="modal fade" id="signup">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title w-100 text-center">USER SIGNUP</h2>
                        <button type="button" className="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                            <button type="submit" className="btn btn-theme form-control" id="submit-button">Signup</button> 
                        </div> 
                        <p id = "alert-pw" className='text-center'></p>
                     </form>
                </div>
            </div>
        </div>
    </div>
    )
  }