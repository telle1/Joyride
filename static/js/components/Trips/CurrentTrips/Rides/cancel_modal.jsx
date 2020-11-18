function CnclModal({show, handleClose, request_id, status, seats, fetchRides}){

    const handleRemove = (evt) => {
        evt.preventDefault()     
        console.log('THIS IS THE REQUST ID', request_id)
        fetch("/delete-request", {
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
            console.log(data.msg) 
            fetchRides();
        })      
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>CANCEL CONFIRMATION </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form onSubmit={handleRemove} method="post">    
                        {(status === 'Pending' || status === 'Approved') ?
                            (<React.Fragment><div className="form-group ml-2">
                                <p>Are you sure you want to cancel?</p>
                            </div>   
                            <div className="form-group mb-2">
                                <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>
                                    Cancel Ride
                                </button> 
                            </div></React.Fragment> ) : 
                            (
                                <div><div className="form-group ml-2">
                                <p>Sorry for the inconvenience. We hope you find another joyride!</p>
                            </div>   
                            <div className="form-group mb-2">
                                <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>
                                    Remove Request
                                </button> 
                            </div></div> 
                            )}
                    </Form>
            </Modal.Body>
        </Modal>
    )}