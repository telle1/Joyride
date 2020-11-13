const { useState, useEffect } = React 
const {Popover, OverlayTrigger} = ReactBootstrap

function CurrentDrives({setAlertColor, setAlertStatus, setShowAlert}){

    const [currentDrives, setCurrentDrives] = useState([])
    console.log(JSON.stringify(currentDrives));

    useEffect(() =>{
        fetch("/current-rides", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
            
        .then(data => {
            console.log('CURRENT DRIVESSSSSSSSS')
            setCurrentDrives(data.drives)
            
        })
    }, []) //currentDrives //[JSON.stringify(currentDrives)]
    
    return (
        <React.Fragment>
            <h3 className="table-header">DRIVING</h3>
            <table className="table table-bordered table-striped">
                <TableHeader col2="Location" col3="Seats" col4="Price" col5="Passengers"></TableHeader>
                <tbody>
                    {currentDrives.map(currentDrive => (
                        <CurrentDrive currentDrive={currentDrive} setAlertColor={setAlertColor} 
                        setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}


function CurrentDrive({currentDrive, setAlertColor, setAlertStatus, setShowAlert}){

    //Delete Ride Modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 
    //Edit Ride Modal
    const [showEdit, setShowEdit] = useState(false)
    const handleEditShow = () => setShowEdit(true)
    const handleEditClose = () => setShowEdit(false) 
    //Manage Passengers Modal
    const [showManage, setShowManage] = useState(false)
    const handleManageShow = () => setShowManage(true)
    const handleManageClose = () => setShowManage(false) 


    const request = () => {

        const requestList = []
        if (currentDrive.requests){
            for (const request of currentDrive.requests){
                //Contact Info Modal
                const [showInfo, setShowInfo] = useState(false)
                const handleInfoShow = () => setShowInfo(true)
                const handleInfoClose = () => setShowInfo(false) 

                requestList.push(
                    <React.Fragment>
                        <button className="btn-transparent mr-2" onClick={handleInfoShow}>{request.name[0]} {request.name[1]} ({request.seats_requested}) ID:{request.id}</button>
                        <ContactInfoModal showInfo={showInfo} handleInfoClose={handleInfoClose} request={request}/>
                        <RadioButton request_id={request.id} seats={request.seats_requested}
                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                    </React.Fragment>)
            }
        }
        return requestList
    }

    const passenger = () => {
        const passengerList = []
        if (currentDrive.passengers){
            for (const passenger of currentDrive.passengers){
                //Passenger Info Modal
                const [showInfo, setShowInfo] = useState(false)
                const handleInfoShow = () => setShowInfo(true)
                const handleInfoClose = () => setShowInfo(false) 
                
                passengerList.push(
                    <React.Fragment>
                        <button className="btn-transparent shadow-none" onClick={handleInfoShow}>{passenger.name[0]} {passenger.name[1]} ({passenger.seats_requested})</button>
                        <ContactInfoModal showInfo={showInfo} handleInfoClose={handleInfoClose} request={passenger}/>
                        <br/>
                    </React.Fragment>
                )
            }
        }   
        return passengerList
    }


    const managePassengers = () => {
        const passengerList = []
        if (currentDrive.passengers){
            for (const passenger of currentDrive.passengers){                
                passengerList.push(
                    <React.Fragment>
                        <Container><Row>
                            <Col><p className="ml-4 pt-2">{passenger.name[0]} {passenger.name[1]} {passenger.req_id}</p></Col> 
                            <Col><button className="btn btn-theme" onDoubleClick={() => removePassenger(passenger.req_id, passenger.seats_requested)}>Remove from ride</button></Col>
                        </Row></Container>
                    </React.Fragment>
                )
            }
        }   
        return passengerList
    }

    const removePassenger = (id, seats) => {

        console.log('THIS IS THE ID', id)
        console.log('SEATS TO ADD', seats)

        fetch("/remove-passenger", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id: id,
                seatsToAdd: seats
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg) 
        })      
    }

    return(
        <tr>
            <td>{currentDrive.date} 
                <React.Fragment>
                    <div>RIDE ID{currentDrive.ride_id}</div>
                    <button className="btn btn-theme mr-2" onClick={handleEditShow}>Edit</button>
                    <button className="btn btn-yellow mr-2" onClick={handleManageShow}>Manage</button>
                    <button className="btn btn-danger" onClick={handleShow}>Delete</button>
                    <DelRideModal show={show} handleClose={handleClose} ride_id={currentDrive.ride_id}/>
                    <EditRideModal showEdit={showEdit} handleEditClose={handleEditClose} currentDrive={currentDrive}/>
                    <ManageRideModal showManage={showManage} handleManageClose={handleManageClose} passengers={managePassengers()}/>
                </React.Fragment>
            </td>
            <td>{currentDrive.start_loc} -> {currentDrive.end_loc}</td>
            <td>{currentDrive.seats}</td>
            <td>${currentDrive.price}</td>
            <td>{passenger()}</td>
            <td>{request()}</td>
        </tr>
    )
}




