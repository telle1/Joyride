const { useState, useEffect } = React 
const {Button } = ReactBootstrap

function CurrentRides(){

    const [currentRides, setCurrentRides] = useState([])
    const [cancel, setCancel] = useState(false)
    const handleShow = () => setCancel(true)
    const handleClose = () => setCancel(false) 

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
    }, [])

    return(
        <div className="riding">
            <h3 className="table-header">RIDING</h3>
            <table className="table table-bordered table-striped">
                <TableHeader col2="From" col3="To" col4="Driver" col5="cost"></TableHeader>
                <tbody>
                {currentRides.map(currentRide => (
                    <tr>
                        <td>{currentRide.date}</td>
                        <td>{currentRide.start_loc}</td>
                        <td>{currentRide.end_loc}</td>
                        <td>{currentRide.driver[0]} {currentRide.driver[1]}</td>
                        <td>{currentRide.cost} REQUEST ID{currentRide.request_id}</td>
                        <td>
                            {currentRide.status}
                            <div className="pull-right">
                            <Button className="btn-theme" onClick={handleShow}>Cancel</Button>
                            </div>
                            <CnclModal cancel={cancel} handleClose={handleClose} request_id={currentRide.request_id}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


function CnclModal({cancel, handleClose, request_id}){

    const handleRemove = (evt, request_id) => {
        evt.preventDefault()
        console.log('THIS IS THE REQUEST-ID', request_id)

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
        <Modal show={cancel} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>CANCEL CONFIRMATION</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={handleRemove({request_id})} method="post">       
                        <div className="input-group input-group-lg mb-4">
                            <p>Are you sure you would like to cancel your ride request?</p>
                        </div>   
                        <div className="form-group mb-4">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Cancel ride</button> 
                        </div>  
                    </form>
            </Modal.Body>
        </Modal>
    )}