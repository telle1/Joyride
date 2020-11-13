function SeatsModal({showEdit, handleEditClose, request_id, oldSeats, seatsAvailable, setShowAlert, setAlertColor, setAlertStatus}){

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

        })      
    }

    return(
        <Modal show={showEdit} onHide={handleEditClose}>
            <Modal.Header closeButton>
            <Modal.Title>UPDATE SEATS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={editSeats} method="post">   
                        <p>Seats Available: {seatsAvailable} </p> 
                        <div>
                            <label htmlFor="seats">New Request:</label>
                            <input type="number" className="ml-2" placeholder={oldSeats} value={seats} onChange={(e) => setSeats(e.target.value)}></input>    
                        </div>  
                        <div className="form-group mb-2 mt-3">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleEditClose}>Request</button> 
                        </div>
                    </form>
            </Modal.Body>
        </Modal>

    )}