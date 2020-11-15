function MatchingRide({matchingRide, setAlertColor, setAlertStatus, setShowAlert}){

    const [showRequest, setShowRequest] = useState(false)
    const handleShow = () => setShowRequest(true)
    const handleClose = () => setShowRequest(false) 

    return (
            <Col xs={6}>
            <div className="card mb-3">
                <h5 className="card-header btn-theme"> {matchingRide.date} </h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="card-title font-weight-bold"><Link to={`/profile/${matchingRide.driver}`}>
                             {matchingRide.driver_fname} {matchingRide.driver_lname} rideID:{matchingRide.ride_id}
                             </Link></h4>
            
                        </div>
                        <div className="col-md-4">
                            <div className="card-text text-right"> 
                                <h3 className = "mb-0 font-weight-bold yellow">{matchingRide.seats} seats </h3>
                                <h3 className = "font-weight-bold yellow">${matchingRide.price} each</h3>
                            </div>
                        </div>
                    </div>
                    <p className="card-text">Driver comments: {matchingRide.comments}</p>
                    <Button className="btn-theme" onClick={handleShow}>Request Ride</Button>
                    <RequestModal rideID = {matchingRide.ride_id} showRequest={showRequest} handleClose={handleClose} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                </div>
            </div> 
            </Col>
    )
}



//date, driverFirstName, driverLastName, seats, price, comments, rideID, 