function LogInModal({showLogin, handleLoginClose, setShowAlert}){

    const {setUser, setAlertStatus, setAlertColor} = useContext(UserContext)

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
              setAlertColor('success')
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
