function RequestModal({showRequest, handleClose, rideID, setAlertColor, setAlertStatus, setShowAlert}){

    const [riderMsg, setRiderMsg] = useState("")
    const [seats, setSeats] = useState(1)

    const sendRequest = (evt) => {
        evt.preventDefault()
        console.log('THIS IS THE RIDE_ID', rideID)
        
        fetch("/request-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ride_id: rideID,
                rider_msg: riderMsg,
                seats: seats
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg)
            setAlertStatus(data.msg)
            setShowAlert(true)
            setAlertColor(data.alert)
        
        })      
    }

    return(
        <Modal show={showRequest} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>REQUEST RIDE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={sendRequest} method="post">  
                        <div>
                            <label htmlFor="seats" className="mr-2 mb-2">Seats</label>
                            <input type="number" placeholder="1" value={seats} onChange={(e) => setSeats(e.target.value)}></input>    
                        </div> 
                        <div className="form-group mb-4 mt-2">
                            <textarea className="form-control" placeholder="Message for driver" rows="3" value={riderMsg} onChange={(e) => setRiderMsg(e.target.value)}></textarea>  
                        </div>   
                        <div className="form-group mb-4">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Request</button> 
                        </div>  
                    </form>
            </Modal.Body>
        </Modal>
    )}