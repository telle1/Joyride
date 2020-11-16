const { useState, useEffect } = React 
const {Button, Modal } = ReactBootstrap

function CurrentRides({setShowAlert, setAlertColor, setAlertStatus}){

    const [currentRides, setCurrentRides] = useState([])
 
    const fetchRides = () => {
        fetch("/current-rides")
        .then(res => res.json())
        .then(data => {
            setCurrentRides(data.rides)
            console.log(data.rides)
        })
    }

    useEffect(() => {
        console.log('THESE ARE CURRENT RIDES', currentRides)
        fetchRides();
    }, []) 

    return(
        <div className="riding">
            <h3 className="table-header">RIDING</h3>
            <table className="table table-bordered table-striped">
                <TableHeader col2="Location" col3="Driver" col4="Seats Requested" col5="Cost(Total)"></TableHeader>
                <tbody>
                    {currentRides.map(currentRide => (
                        <RideListItem key={currentRide.request_id} currentRide = {currentRide} fetchRides={fetchRides}
                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


function RideListItem({currentRide, setAlertColor, setAlertStatus, setShowAlert, fetchRides}){
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
        <td>{currentRide.date} <p>REQUEST{currentRide.request_id} RIDER ID{currentRide.rider_id} FOR RIDE{currentRide.ride_id}</p>

        {currentRide.status === 'Pending' ? <span><button className="btn btn-yellow mr-2" onClick={handleEditShow}>Edit Seats</button> 
        <SeatsModal showEdit={showEdit} handleEditClose={handleEditClose} fetchRides={fetchRides}
        request_id={currentRide.request_id} oldSeats={currentRide.seats_requested} seatsAvailable={currentRide.seats_available}
        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/></span>: null}

        {(currentRide.status === 'Pending' || currentRide.status === 'Approved') ?
            <button className="btn btn-danger" onClick={handleShow}> Cancel Request </button> : 
            <button className="btn btn-theme" onClick={handleShow}> Delete Entry </button> }
        <CnclModal key={currentRide.request_id} show={show} handleClose={handleClose} fetchRides={fetchRides}
        request_id={currentRide.request_id} seats={currentRide.seats_requested} status={currentRide.status}/>

        </td>
        <td>{currentRide.start_loc} -> {currentRide.end_loc}</td>
        <td>
        <button className="btn-transparent mr-2" onClick={handleInfoShow}>{currentRide.driver.first_name} {currentRide.driver.last_name}</button>
                    <ContactInfoModal showInfo={showInfo} handleInfoClose={handleInfoClose} request={currentRide.driver}/>
        </td>
        <td>{currentRide.seats_requested}
        </td>
        <td>${currentRide.cost * currentRide.seats_requested} </td>
        <td>
            {currentRide.status}
        </td>      
    </tr>

    )
}


