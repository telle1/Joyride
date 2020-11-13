const { useState, useEffect } = React 
const {Button, Modal } = ReactBootstrap

function CurrentRides({setShowAlert, setAlertColor, setAlertStatus}){

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
                <TableHeader col2="Location" col3="Driver" col4="Seats Requested" col5="Cost(Total)"></TableHeader>
                <tbody>
                    {currentRides.map(currentRide => (
                        <RideListItem key={currentRide.request_id} currentRide = {currentRide}
                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


function RideListItem({currentRide, setAlertColor, setAlertStatus, setShowAlert,}){
    //Cancel ride/Delete ride modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 
    //Edit seats modal
    const [showEdit, setShowEdit] = useState(false)
    const handleEditShow = () => setShowEdit(true)
    const handleEditClose = () => setShowEdit(false) 
    //Driver contact modal
    const [showInfo, setShowInfo] = useState(false)
    const handleInfoShow = () => setShowInfo(true)
    const handleInfoClose = () => setShowInfo(false) 

    return (
    <tr key={currentRide.request_id}> 
        <td>{currentRide.date} <p>REQUEST{currentRide.request_id} RIDER ID{currentRide.rider_id} FOR RIDE{currentRide.ride_id}</p></td>
        <td>{currentRide.start_loc} -> {currentRide.end_loc}</td>
        <td>
        <button className="btn btn-transparent mr-2" onClick={handleInfoShow}>{currentRide.driver.first_name} {currentRide.driver.last_name}</button>
                    <ContactInfoModal showInfo={showInfo} handleInfoClose={handleInfoClose} request={currentRide.driver}/>
        </td>
        <td>{currentRide.seats_requested}
            {currentRide.status === 'Pending' ? <span><button className="btn btn-yellow ml-3" onClick={handleEditShow}>Edit</button> 
            <SeatsModal showEdit={showEdit} handleEditClose={handleEditClose} 
            request_id={currentRide.request_id} oldSeats={currentRide.seats_requested} seatsAvailable={currentRide.seats_available}
            setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/></span>: null}
        </td>
        <td>${currentRide.cost * currentRide.seats_requested} </td>
        <td>
            {currentRide.status}
            <div className="pull-right">
            {(currentRide.status === 'Pending' || currentRide.status === 'Approved') ?
                <button className="btn btn-danger" onClick={handleShow}> Cancel Request </button> : 
                <button className="btn btn-theme" onClick={handleShow}> Delete Entry </button> }
            </div>   
            <CnclModal key={currentRide.request_id} show={show} handleClose={handleClose} 
            request_id={currentRide.request_id} seats={currentRide.seats_requested} status={currentRide.status}/>
        </td>      
    </tr>

    )
}

