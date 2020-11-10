const { useState, useEffect } = React 
const { Col } = ReactBootstrap

// function RequestAlert({text, setShowAlert, color}){
//     return (
//       <Alert className = "alert-position" variant={color} onClose={() => setShowAlert(false)} dismissible>
//         <Alert.Heading>{text}</Alert.Heading>
//      </Alert>
//     )
//   }

function Search(){
    const [matchingRides, setMatchingRides] = useState([])
    const [startInput, setStartInput] = useState("")
    const [endInput, setEndInput] = useState("")
    const [requestStatus, showRequestStatus] = useState(false)

    const getMatchingRides = (evt) => {
        evt.preventDefault()
        fetch("/search-results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                startInput: startInput,
                endInput: endInput
            }) 
        })
        .then(res => res.json())
        .then(data => {
            setMatchingRides(data.res)
            console.log(matchingRides)
        })        
    }

    return (
        <div className="container search-container">
            {/* {requestStatus ? <RequestAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null} */}
            <div className="row">
                <form onSubmit={getMatchingRides} className="form-inline mx-auto" id="search-rides" method="post">
                    <input type="text" className="form-control mr-2" name="from_input" id = "from_input" value={startInput} onChange={(e)=>setStartInput(e.target.value)} placeholder="Start Location" required/>
                    <input type="text" className="form-control mr-2" name="to_input" id= "to_input" value={endInput} onChange={(e)=>setEndInput(e.target.value)} placeholder="Destination" required/>
                    <input type="date" className="form-control mr-2" name="date"/>
                    <button type="submit" className="btn btn-theme my-1">Search</button>
                </form>
            </div>
            {matchingRides.map(matchingRide => (
                <MatchingRide 
                    key = {matchingRide.ride_id}
                    rideID = {matchingRide.ride_id}
                    date= {matchingRide.date}
                    driverFirstName= {matchingRide.driver_fname}
                    driverLastName= {matchingRide.driver_lname}
                    seats = {matchingRide.seats}
                    price = {matchingRide.price}
                    comments = {matchingRide.comments}/>
            ))}
        </div>
    )   
}


function MatchingRide({date, driverFirstName, driverLastName, seats, price, comments, rideID}){

    const [showRequest, setShowRequest] = useState(false)
    const handleShow = () => setShowRequest(true)
    const handleClose = () => setShowRequest(false) 

    return (
            <Col xs={6}>
            <div className="card mb-3">
                <h5 className="card-header btn-theme"> {date} </h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="card-title font-weight-bold"> {driverFirstName} {driverLastName} </h4>
                        </div>
                        <div className="col-md-4">
                            <div className="card-text text-right"> 
                                <h3 className = "mb-0 font-weight-bold yellow">{seats} seats </h3>
                                <h3 className = "font-weight-bold yellow">${price} each</h3>
                            </div>
                        </div>
                    </div>
                    <p className="card-text">Driver comments: {comments}</p>
                    <Button className="btn-theme" onClick={handleShow}>Request Ride</Button>
                    <RequestModal rideID = {rideID} showRequest={showRequest} handleClose={handleClose}/>
                </div>
            </div> 
            </Col>
    )
}

function RequestModal({showRequest, handleClose, rideID}){

    const [riderMsg, setRiderMsg] = useState("")

    const sendRequest = (evt) => {
        evt.preventDefault()
        console.log('TESTTTTTTTT')
        fetch("/request-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ride_id: rideID,
                rider_msg: riderMsg
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg)
        })      
    }

    return(
        <Modal show={showRequest} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>USER LOGIN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={sendRequest} method="post">       
                        <div className="input-group input-group-lg mb-4">
                            <textarea id = "rider_msg" className="form-control" placeholder="Message for driver" rows="3" value={riderMsg} onChange={(e) => setRiderMsg(e.target.value)}></textarea>  
                        </div>   
                        <div className="form-group mb-4">
                            <button type="submit" className="btn btn-theme form-control">Request</button> 
                        </div>  
                    </form>
            </Modal.Body>
        </Modal>
    )}