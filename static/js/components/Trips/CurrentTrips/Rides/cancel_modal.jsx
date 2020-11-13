function CnclModal({show, handleClose, request_id, status, seats}){

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
        })      
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>CANCEL CONFIRMATION </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={handleRemove} method="post">    
                        {(status === 'Pending' || status === 'Approved') ?
                            (<div><div className="input-group input-group-lg mb-4 ml-2">
                                <p>Are you sure you want to cancel?</p>
                            </div>   
                            <div className="form-group mb-4">
                                <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>
                                    Cancel Ride
                                </button> 
                            </div></div> ) : 
                            (
                                <div><div className="input-group input-group-lg mb-4 ml-2">
                                <p>Sorry for the inconvenience. We hope you find another joyride!</p>
                            </div>   
                            <div className="form-group mb-4">
                                <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>
                                    Remove Request
                                </button> 
                            </div></div> 
                            )}
                    </form>
            </Modal.Body>
        </Modal>
    )}