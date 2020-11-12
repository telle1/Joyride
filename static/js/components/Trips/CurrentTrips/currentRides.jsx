const { useState, useEffect } = React 
const {Button, Modal } = ReactBootstrap

function CurrentRides(){

    const [currentRides, setCurrentRides] = useState([])

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

    
    function currentRide(){
        let rideList = []
        for (let i=0; i<currentRides.length; i++){
            let currentRide = currentRides[i];

            rideList.push(<RideListItem currentRide = {currentRide}/>)
            
        }
        console.log('HELLLO', rideList)
        return rideList
    }

    return(
        <div className="riding">
            <h3 className="table-header">RIDING</h3>
            <table className="table table-bordered table-striped">
                <TableHeader col2="From" col3="To" col4="Driver" col5="cost"></TableHeader>
                <tbody>
                    {currentRide()}
                </tbody>
            </table>
        </div>
    )
}


function RideListItem({currentRide}){

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 

    console.log('RIDE LIST ITEMMMMM', currentRide)

    function handleRemove(evt){
        evt.preventDefault()     

        console.log('THIS IS THE REQUEST-ID', currentRide.request_id)

        fetch("/delete-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id: currentRide.request_id
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg) 
        })      
    }

    return (
    <tr key={currentRide.request_id}> 
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
            <CnclModal key={currentRide.request_id} show={show} handleRemove={handleRemove} handleClose={handleClose} request_id={currentRide.request_id}/>
        </td>      
    </tr>

    )
}

function CnclModal({show, handleClose, handleRemove}){
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>CANCEL CONFIRMATION </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={handleRemove} method="post">       
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



        // const [id, setId] = useState("")
    // console.log('REQUEST IDDDDDDD', request_id)
    
    // const handleRemove = (evt) => {
    //     evt.preventDefault()

    //     // setId(request_id)

    //     console.log('THIS IS THE REQUEST-ID', request_id)

    //     fetch("/delete-ride", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             request_id: request_id
    //         }) 
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data.msg) 
    //     })      
    // }
                    {/* {currentRides.map(currentRide => (
                    // <tr key={currentRide.request_id}> 
                    //     <td>{currentRide.date}</td>
                    //     <td>{currentRide.start_loc}</td>
                    //     <td>{currentRide.end_loc}</td>
                    //     <td>{currentRide.driver[0]} {currentRide.driver[1]}</td>
                    //     <td>{currentRide.cost} REQUEST ID{currentRide.request_id}</td>
                    //     <td>
                    //         {currentRide.status}
                    //         <div className="pull-right">
                    //         <Button className="btn-theme" onClick={handleShow}>Cancel</Button>
                    //         </div>   
                    //         <CnclModal key={currentRide.request_id} show={show} handleClose={handleClose} request_id={currentRide.request_id}/>
                    //     </td>      
                    // </tr>
                ))} */}