function MatchingRide({matchingRide, setAlertColor, setAlertStatus, setShowAlert}){

    const [showRequest, setShowRequest] = useState(false)
    const handleShow = () => setShowRequest(true)
    const handleClose = () => setShowRequest(false) 

    return (
            <React.Fragment>
            <div className="card mb-3">
                <h5 className="card-header btn-theme"> {matchingRide.date} </h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={'../static/images/user.jpg'} alt="Admin" className="profile-image" width="150" height="150"/>

                        </div>

                        <div className="col-md-4">
                            <h4 className="card-title font-weight-bold">
                             {matchingRide.driver_fname} {matchingRide.driver_lname} ID{matchingRide.ride_id}
                             </h4>
                             <p className="card-text">Driver comments: {matchingRide.comments}</p>
                        </div>

                        <div className="col-md-4">
                            <div className="card-text text-right"> 
                                <h3 className = "mb-0 font-weight-bold yellow">{matchingRide.seats} seats </h3>
                                <h3 className = "font-weight-bold yellow">${matchingRide.price} each</h3>
                            </div>
                        </div>
                    </div>

                    <Row>
                    <Col><p className="pl-5 pt-2">5 stars</p></Col>
                    <Col>
                        <button className="btn btn-theme float-right" onClick={handleShow}>Request Ride</button>
                        <button className="btn btn-yellow float-right"><Link to={`/profile/${matchingRide.driver}`} className="text-white">View Profile</Link></button>
                    </Col>
                    <RequestModal rideID = {matchingRide.ride_id} showRequest={showRequest} handleClose={handleClose} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                    </Row>
                    
            </div>
            </div>
            </React.Fragment>
            // <React.Fragment>
            // <div className="card mb-3">
            //     <h5 className="card-header btn-theme"> {matchingRide.date} </h5>
            //     <div className="card-body text-center">

            //                 <img src={'../static/images/testimonial_1.jpg'} alt="Admin" className="profile-image" width="150" height="150"/><br/>

            //                 <h4 className="card-title font-weight-bold mt-2"><Link to={`/profile/${matchingRide.driver}`}>
            //                  {matchingRide.driver_fname} {matchingRide.driver_lname} ID{matchingRide.ride_id}
            //                  </Link></h4>
            //                  <span>5 stars</span>


            //                 <div className="card-text"> 
            //                     <h3 className = "mb-0 font-weight-bold yellow">{matchingRide.seats} seats | ${matchingRide.price} each </h3>
            //                 </div>

            //                 <p className="card-text">Driver comments: {matchingRide.comments}</p>

               

            //         <Row>
            //         <Col><Button className="btn-theme float-right" onClick={handleShow}>Request Ride</Button></Col>
            //         <RequestModal rideID = {matchingRide.ride_id} showRequest={showRequest} handleClose={handleClose} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
            //         </Row>    
            //     </div>
            // </div>
            // </React.Fragment>
    )
}



//date, driverFirstName, driverLastName, seats, price, comments, rideID, 
            {/* <div className="card mb-3" style={{maxWidth: "25rem"}}>
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
                    <RequestModal rideID = {matchingRide.ride_id} showRequest={showRequest} handleClose={handleClose} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/> */}
                {/* </div>
            </div>  */}