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