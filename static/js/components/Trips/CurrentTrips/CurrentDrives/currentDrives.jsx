const { useState, useEffect } = React 
const {Popover, OverlayTrigger} = ReactBootstrap

function CurrentDrives({setAlertColor, setAlertStatus, setShowAlert}){

    const [currentDrives, setCurrentDrives] = useState([])

    useEffect(() =>{
        fetch("/current-rides", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setCurrentDrives(data.drives)
        })
    }, []) //currentDrives 
    
    return (
        <div>
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
        </div>
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

                requestList.push(<p>
                    <button className="btn btn-transparent mr-2" onClick={handleInfoShow}>{request.name[0]} {request.name[1]} {request.id}</button>
                    <ContactInfoModal showInfo={showInfo} handleInfoClose={handleInfoClose} request={request}/>
                    <RadioButton request_id={request.id}
                    setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                    </p>)
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
                    <span>
                    <button className="btn btn-transparent mr-2" onClick={handleInfoShow}>{passenger.name[0]} {passenger.name[1]}</button>
                    <ContactInfoModal showInfo={showInfo} handleInfoClose={handleInfoClose} request={passenger}/>
                    </span>
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
                    <p>
                        <Container><Row>
                        <Col> <p className="ml-4 pt-2">{passenger.name[0]} {passenger.name[1]} {passenger.req_id}</p></Col> 
                        <Col> <button className="btn btn-theme" onDoubleClick={() => removePassenger(passenger.req_id)}>Remove from ride</button></Col>
                        </Row></Container>
                    </p>
                )
            }
        }   
        return passengerList
    }

    const removePassenger = (id) => {

        console.log('THIS IS THE ID', id)

        fetch("/remove-passenger", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id: id
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg) 
        })      
    }

    return(
        <tr>
            <td>
                {currentDrive.date} RIDE ID{currentDrive.ride_id}
                <div>
                <button className="btn btn-theme mr-2" onClick={handleEditShow}>Edit</button>
                <button className="btn btn-yellow mr-2" onClick={handleManageShow}>Manage</button>
                <button className="btn btn-danger" onClick={handleShow}>Delete</button>
                <DelRideModal show={show} handleClose={handleClose} ride_id={currentDrive.ride_id}/>
                <EditRideModal showEdit={showEdit} handleEditClose={handleEditClose} currentDrive={currentDrive}/>
                <ManageRideModal showManage={showManage} handleManageClose={handleManageClose} passengers={managePassengers()}/>
                </div>
            </td>
            <td>{currentDrive.start_loc} -> {currentDrive.end_loc}</td>
            <td>{currentDrive.seats}</td>
            <td>{currentDrive.price}</td>
            <td>{passenger()}</td>
            <td>{request()}</td>
        </tr>
    )
}




function ManageRideModal({showManage, handleManageClose, passengers}){


    return(
        <Modal show={showManage} onHide={handleManageClose}>
            <Modal.Header closeButton>
            <Modal.Title>MANAGE PASSENGERS </Modal.Title>
            </Modal.Header>
            <Modal.Body> {passengers} </Modal.Body>
            <Modal.Footer> Double click to remove a passenger. This action is <span>permanent.</span> </Modal.Footer>
        </Modal>
    )}
