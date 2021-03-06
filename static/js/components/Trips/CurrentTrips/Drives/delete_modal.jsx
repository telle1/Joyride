function DelRideModal({show, handleClose, ride_id, setShowAlert, fetchDrives}){

    const {setAlertStatus, setAlertColor} = useContext(UserContext);

    const handleRemove = (evt) => {
        evt.preventDefault()     
        console.log('THIS IS THE RIDE ID', ride_id)
        fetch("/delete-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ride_id: ride_id
            }) 
        })
        .then(res => res.json())
        .then(data => {
            setAlertColor(data.color)
            setAlertStatus(data.msg)
            setShowAlert(true)
            fetchDrives();
        })      
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>CANCEL CONFIRMATION </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form onSubmit={handleRemove} method="post">       
                        <div className="form-group- mb-2">
                            <p className="ml-1 mr-1">Are you sure you want to <span className="font-weight-bold">permanently</span> delete this ride? Joyriders are counting on you!</p>
                        </div>   
                        <div className="form-group mb-2">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Cancel ride</button> 
                        </div>  
                    </Form>
            </Modal.Body>
        </Modal>
    )}
