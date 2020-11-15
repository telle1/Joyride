const { useEffect, useState } = React
const {Container, Row, Col} = ReactBootstrap


function Profile({match}){

    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() =>{
        console.log(match)
        fetch(`/get-user-feedback/${match.params.profileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setFeedbacks(data.feedback)
        })
    }, [])
    
    return (
        <Container className="profile-page">
            <Row>
            <Col xs={4}>
                <UserInfo/> 
            </Col>
            <Col>
                <FeedbackContainer feedbacks={feedbacks}/>
            </Col>
            </Row>
        </Container>
    )
}

function UserInfo(){
    return (
    <div className="card">
        <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
            <img src="test" alt="Admin" className="rounded-circle" width="150"/>
            <div className="mt-3">
            <h4>John Doe</h4>
            <p className="text-secondary mb-1">Full Stack Developer</p>
            <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
            <button className="btn btn-primary">Follow</button>
            <button className="btn btn-outline-primary">Message</button>
            </div>
        </div>
        </div>  
    </div>  
    )
}

// function Profile(){
//     return (
//         <div>test</div>
//     )
// }


// function EditProfile(){

//     const [title, setTitle] = useState("")
//     const [location, setLocation] = useState("")
//     const [description, setDescription] = useState("")


//     <div className="container">
//     <div className="row">
//     <div className="col-md-5">
//         <form onSubmit={handleSubmit} className="f-grey" method="post">
//         <h3 className="mb-3"> Post a Ride</h3>
//         <div className="form-group row">
//             <div className = "col-md-3 col-form-label">
//             <label htmlFor="#">From</label>
//             </div>
//             <div className="col-sm-9">
//             <input type="text" className="form-control" name="from_input" id="from_input" placeholder="Start Location" value={from} onChange={(e) => setFrom(e.target.value)} required/>
//             </div>
//         </div>
//         <div className="form-group row">
//             <div className = "col-md-3 col-form-label">
//             <label htmlFor="#">To</label>
//             </div>
//             <div className="col-sm-9">
//             <input type="text" className="form-control" name="to_input" id="to_input" placeholder="End Location" value={to} onChange={(e) => setTo(e.target.value)} required/>
//             </div> 
//         </div>
//         </form>
//     </div>
//     </div>
//     </div>

// }
