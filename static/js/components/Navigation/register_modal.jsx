function RegisterModal({showRegister, handleRegisterClose, setShowAlert}){

    const {setAlertStatus, setAlertColor} = useContext(UserContext)

    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", ""); //Need to confirm if passwords match.

    const onSubmit = async data => {
        handleRegisterClose()

        fetch("/process-signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phoneNumber: data.phone,
            password: data.password,
        })
        })
        .then(res => res.json())
        .then(resp => {
            console.log(resp)
            setShowAlert(true)
            setAlertStatus(resp.msg)
            setAlertColor(resp.color)
        })
    };
    
      return(
        <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title> USER SIGNUP </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={e => e.preventDefault()} method="post">

                <InputGroup size="lg" className="mb-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-user"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <input name="first_name" type="text" className="form-control" placeholder="First Name" 
                        ref={register({required: true})}/>
                </InputGroup>
                {errors.first_name && <div className="error-message">Please enter your first name.</div>}

                <InputGroup size="lg" className="mb-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-user"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <input name="last_name" type="text" className="form-control" placeholder="Last Name"
                        ref={register({required: true})}/>
                </InputGroup>
                {errors.last_name && <div className="error-message">Please enter your last name.</div>}

                <InputGroup size="lg" className="mb-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-envelope"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <input name="email" type="text" className="form-control" placeholder="Email"
                        ref={register({required: true})}/>
                </InputGroup>
                {errors.email && <div className="error-message">Please enter your email.</div>}

                <InputGroup size="lg" className="mb-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-phone"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <input type="tel" className="form-control" name="phone" placeholder="8888888888"
                    ref={register({required: true, pattern:/\d{10}/})}/>
                </InputGroup>
                {errors.phone && <div className="error-message">Please enter a valid number with the format: 8888888888.</div>}

                <InputGroup size="lg" className="mb-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <input name="password" type="password" className="form-control" placeholder="Password"
                        ref={register({required: "You must enter a password", 
                        minLength: {value: 8, message: "Password must have at least 8 characters"}
                    })}/>
                </InputGroup>
                {errors.password &&  <div className="error-message">{errors.password.message}</div>}

                <InputGroup size="lg" className="mb-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <input
                    name="confirm_password" type="password" className="form-control" placeholder="Confirm Password"
                        ref={register({required: "Please re-enter your password",
                            validate: value => value === password.current || "Passwords do not match"
                        })}/>
                </InputGroup> 
                {errors.confirm_password && <div className="error-message">{errors.confirm_password.message}</div>}

                <div className="form-group mb-4">
                    <button type="submit" className="btn btn-theme form-control" onClick={handleSubmit(onSubmit)} >Signup</button> 
                </div> 
            </Form>
        </Modal.Body>
      </Modal>
    )
  }


