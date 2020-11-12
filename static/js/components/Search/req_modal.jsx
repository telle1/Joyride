function RequestModal({showRequest, handleClose, rideID, setAlertColor, setAlertStatus, setShowAlert}){

    const [riderMsg, setRiderMsg] = useState("")

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
                rider_msg: riderMsg
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
            <Modal.Title>USER LOGIN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={sendRequest} method="post">       
                        <div className="input-group input-group-lg mb-4">
                            <textarea id = "rider_msg" className="form-control" placeholder="Message for driver" rows="3" value={riderMsg} onChange={(e) => setRiderMsg(e.target.value)}></textarea>  
                        </div>   
                        <div className="form-group mb-4">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Request</button> 
                        </div>  
                    </form>
            </Modal.Body>
        </Modal>
    )}