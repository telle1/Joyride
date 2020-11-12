const { useState, useEffect } = React 
const {Button, Modal } = ReactBootstrap

function CurrentRides(){

    const [currentRides, setCurrentRides] = useState([])
    //want to call this everytime currentRides changes...
    useEffect(() => {
        fetch("/current-rides", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setCurrentRides(data.rides)
            console.log(data.rides)
        })
    }, []) //CHANGE BACK TO currentRides

    return(
        <div className="riding">
            <h3 className="table-header">RIDING</h3>
            <table className="table table-bordered table-striped">
                <TableHeader col2="From" col3="To" col4="Driver" col5="Cost"></TableHeader>
                <tbody>
                    {currentRides.map(currentRide => (
                        <RideListItem currentRide = {currentRide}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


function RideListItem({currentRide}){

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 

    return (
    <tr key={currentRide.request_id}> 
        <td>{currentRide.date}</td>
        <td>{currentRide.start_loc}</td>
        <td>{currentRide.end_loc}</td>
        <td>{currentRide.driver[0]} {currentRide.driver[1]}</td>
        <td>${currentRide.cost} </td>
        <td>
            {currentRide.status}
            <div className="pull-right">
            <Button className="btn-theme" onClick={handleShow}>Cancel</Button>
            </div>   
            <CnclModal key={currentRide.request_id} show={show} handleClose={handleClose} request_id={currentRide.request_id}/>
        </td>      
    </tr>

    )
}

function CnclModal({show, handleClose, request_id}){

    const handleRemove = (evt) => {
        evt.preventDefault()     
        console.log('THIS IS THE REQUST ID', request_id)
        fetch("/delete-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id: request_id
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
                        <div className="input-group input-group-lg mb-4 ml-2">
                            <p>Are you sure you want to cancel?</p>
                        </div>   
                        <div className="form-group mb-4">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Cancel ride</button> 
                        </div>  
                    </form>
            </Modal.Body>
        </Modal>
    )}

