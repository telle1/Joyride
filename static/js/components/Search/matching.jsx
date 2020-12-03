function MatchingRide({matchingRide, setShowAlert}){

    const [showRequest, setShowRequest] = useState(false)
    const handleShow = () => setShowRequest(true)
    const handleClose = () => setShowRequest(false) 

    return (
            <React.Fragment>
            <Card className="mb-3">
                <Card.Header className="h5 btn-theme"> {matchingRide.date} </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            {matchingRide.driver_picture ?
                            <img src={`../static/uploads/${matchingRide.driver_picture}`} alt="Driver Picure" className="profile-image" width="150" height="150"/>
                            : <img src={'../static/images/user.jpg'} alt="Driver Picture" className="profile-image" width="150" height="150"/>}
                        </Col>

                        <Col>
                            <Card.Title className="h4 font-weight-bold">
                             {matchingRide.driver_fname} {matchingRide.driver_lname} 
                             ID{matchingRide.ride_id}
                             </Card.Title>
                             <Card.Text>Driver comments: {matchingRide.comments}</Card.Text>
                        </Col>

                        <Col>
                            <Card.Text className="text-right"> 
                                <span className = "h5 mb-0 font-weight-bold yellow">{matchingRide.seats} seats </span> <br/>
                                <span className = "h5 font-weight-bold yellow">${matchingRide.price} each</span>
                            </Card.Text>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={4} className="text-center">
                            {matchingRide.average_rating == 'N/A' ? <div className="pt-2"></div> : 
                                <div className="pt-2 font-weight-bold yellow"> 
                                    {[...Array(Math.floor(matchingRide.average_rating))].map(star =>
                                        <Star colorInput="#eba92a" cursor="no-pointer"/>)} 
                                    {(matchingRide.average_rating - Math.floor(matchingRide.average_rating)) >= 0.5 ? 
                                        <i class="fas fa-star-half" style={{color: "#eba92a"}}></i> : null}
                                </div>
                            }
                            <p className="text-center font-weight-bold yellow my-0"> {matchingRide.average_rating} stars</p>

                        </Col>
                        <Col>
                            <button className="btn btn-theme-outline float-right" onClick={handleShow}>Request Ride</button>
                            <RequestModal rideID = {matchingRide.ride_id} showRequest={showRequest} 
                                handleClose={handleClose} setShowAlert={setShowAlert}/>
                            <button className="btn btn-yellow float-right"><Link to={`/profile/${matchingRide.driver}`} className="text-white">View Profile</Link></button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </React.Fragment>
    )
}