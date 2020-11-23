const {useForm} = ReactHookForm
const {InputGroup} = ReactBootstrap

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


//   function Test() {
//     const { register, errors, handleSubmit, watch } = useForm({});
//     const password = useRef({});
//     console.log(password, 'THIS IS IN PASSWORD')
//     password.current = watch("password", "");

//     const onSubmit = async data => {
//       console.log('DATA', data)


//       fetch("/process-signup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             firstName: data.first_name,
//             lastName: data.last_name,
//             email: data.email,
//             phoneNumber: data.phone,
//             password: data.password,
//         })
//     })
//     .then(res => res.json())
//     .then(resp => {
//         console.log(resp)
//         setShowAlert(true)
//         setAlertStatus(resp.msg)
//         setAlertColor(resp.color)
//     })

//     };
  
//     return (
//     <Form onSubmit={e => e.preventDefault()} method="post">

//     <div className="input-group input-group-lg mb-4">
//         <div className="input-group-prepend">
//             <span className="input-group-text"><i className="fas fa-user"></i></span>
//         </div>
//         <input name="first_name" type="text" className="form-control" placeholder="First Name" 
//             ref={register({required: true})}/>
//     </div>
//     {errors.first_name && <div className="error-message">Please enter your first name.</div>}

//     <div className="input-group input-group-lg mb-4">
//         <div className="input-group-prepend">
//             <span className="input-group-text"><i className="fas fa-user"></i></span>
//         </div>
//         <input name="last_name" type="text" className="form-control" placeholder="Last Name"
//             ref={register({required: true})}/>
//     </div>
//     {errors.last_name && <div className="error-message">Please enter your last name.</div>}

//     <div className="input-group input-group-lg mb-4">
//         <div className="input-group-prepend">
//             <span className="input-group-text"><i className="fas fa-envelope"></i></span>
//         </div>
//         <input name="email" type="text" className="form-control" placeholder="Email"
//             ref={register({required: true})}/>
//     </div>
//     {errors.email && <div className="error-message">Please enter your email.</div>}

//     <div className="input-group input-group-lg mb-4">
//         <div className="input-group-prepend">
//             <span className="input-group-text"><i className="fas fa-phone"></i></span>
//         </div>
//         <input type="tel" className="form-control" name="phone" placeholder="8888888888"
//         ref={register({required: true, pattern:/\d{10}/})}/>
//     </div>
//     {errors.phone && <div className="error-message">Please enter a valid number with the format: 8888888888.</div>}


//     <div className="input-group input-group-lg mb-4">
//         <div className="input-group-prepend">
//             <span className="input-group-text"><i className="fas fa-lock"></i></span>
//         </div>
//         <input name="password" type="password" className="form-control" placeholder="Password"
//             ref={register({required: "You must specify a password", 
//             minLength: {value: 8, message: "Password must have at least 8 characters"}
//         })}/>
//     </div>
//     {errors.password &&  <div className="error-message">{errors.password.message}</div>}

//     <div className="input-group input-group-lg mb-4">
//         <div className="input-group-prepend">
//             <span className="input-group-text"><i className="fas fa-lock"></i></span>
//         </div>
//         <input
//         name="confirm_password" type="password" className="form-control" placeholder="Confirm Password"
//             ref={register({required: "Please re-enter your password",
//                 validate: value => value === password.current || "The passwords do not match"
//             })}/>
//     </div>  
//     {errors.confirm_password && <div className="error-message">{errors.confirm_password.message}</div>}

//     <div className="form-group mb-4">
//         <button type="submit" className="btn btn-theme form-control" onClick={handleSubmit(onSubmit)} >Signup</button> 
//     </div> 
//   </Form>
//     );
//   }
  
  


  //    <form onSubmit={handleSubmit(onSubmit)} method="post">
//   <div className="input-group input-group-lg mb-4">
//   <div className="input-group-prepend">
//       <span className="input-group-text"><i className="fas fa-user"></i></span>
//   </div>
//   <input type="text" className="form-control" placeholder="First Name" name="first_name" ref={register}/>
// </div>
// <div className="input-group input-group-lg mb-4">
//   <div className="input-group-prepend">
//       <span className="input-group-text"><i className="fas fa-user"></i></span>
//   </div>
//   <input type="text" className="form-control" placeholder="Last Name" name="last_name" ref={register}/>
// </div>
// <div className="input-group input-group-lg mb-4">
//   <div className="input-group-prepend">
//       <span className="input-group-text"><i className="fas fa-envelope"></i></span>
//   </div>
//   <input type="text" className="form-control" placeholder="Email" name="email" ref={register}/>
// </div>
// <div className="input-group input-group-lg mb-4">
//   <div className="input-group-prepend">
//       <span className="input-group-text"><i className="fas fa-phone"></i></span>
//   </div>
//   <input type="tel" className="form-control" name="phone" placeholder="8888888888" pattern="\d{10}" ref={register}/>
// </div>

// <div className="input-group input-group-lg mb-4">
//   <div className="input-group-prepend">
//       <span className="input-group-text"><i className="fas fa-lock"></i></span>
//   </div>
//   <input type="password" className="form-control" placeholder="Password" name="password" ref={register}/>
// </div>
// <div className="input-group input-group-lg mb-4">
//   <div className="input-group-prepend">
//       <span className="input-group-text"><i className="fas fa-lock"></i></span>
//   </div>
//   <input type="password" className="form-control" placeholder="Re-enter Password" name="confirm_password" 
//       ref={register({
//           validate: value =>
//           value === password.current || "The passwords do not match"
//       })}/>
// </div>  
// {errors.confirm_password && <p>{errors.password_repeat.message}</p>}


// <div className="form-group mb-4">
//   <button type="submit" className="btn btn-theme form-control">Signup</button> 
// </div> 
// </form>

        {/* <form onSubmit={handleRegistration} method="post">
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
              <button type="submit" className="btn btn-theme form-control">Signup</button> 
          </div> 
        </form> */}

        // const [firstName, setFirstName] = useState(null)
        // const [lastName, setLastName] = useState(null)
        // const [email, setEmail] = useState(null)
        // const [phoneNumber, setPhoneNumber] = useState(null)
        // const [password, setPassword] = useState(null)
        // const [confirmPassword, setConfirmPassword] = useState(null)
    
        // const handleRegistration = (e) => {
        //     e.preventDefault()
    
    
        //         fetch("/process-signup", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 firstName: firstName,
        //                 lastName: lastName,
        //                 email: email,
        //                 phoneNumber: phoneNumber,
        //                 password: password,
        //             })
        //         })
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log(data)
        //             console.log(data.msg)
        //             setFirstName("")
        //             setLastName("")
        //             setEmail("")
        //             setPhoneNumber("")
        //             setPassword("")
        //             setConfirmPassword("")
        //             setShowAlert(true)
        //             setAlertStatus(data.msg)
        //             if (data.success){
        //             setAlertColor("success")
        //             } else {
        //             setAlertColor("danger")
        //             }
        //         })
        //     }