function SeatsModal({showEdit, handleEditClose, request_id, oldSeats, seatsAvailable, setShowAlert, setAlertColor, setAlertStatus, fetchRides}){

    const [seats, setSeats]= useState(oldSeats)

    const editSeats = (evt) => {
        evt.preventDefault()     
        console.log('THIS IS THE REQUST ID', request_id, 'seats', seats)
        fetch("/edit-seats-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id: request_id,
                seats: seats
            }) 
        })
        .then(res => res.json())
        .then(data => {
            setAlertStatus(data.msg) 
            setShowAlert(true)
            setAlertColor(data.alert)
            fetchRides();

        })      
    }

    return(
        <Modal show={showEdit} onHide={handleEditClose}>
            <Modal.Header closeButton>
            <Modal.Title>UPDATE SEATS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={editSeats} className="ml-3 mr-3" method="post">   
                        <div className="form-group row">
                            <Col xs={4}> Seats Available: </Col>
                            <Col>{seatsAvailable}</Col>   
                        </div>
                        <div className="form-group row">
                            <Col xs={4}> <label htmlFor="seats">New Request:</label> </Col>
                            <Col><input type="number" placeholder={oldSeats} value={seats} onChange={(e) => setSeats(e.target.value)}></input></Col>   
                        </div>  
                        <div className="form-group mb-2 mt-3">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleEditClose}>Request</button> 
                        </div>
                    </form>
            </Modal.Body>
        </Modal>

    )}