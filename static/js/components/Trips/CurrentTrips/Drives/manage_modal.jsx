const { useContext } = require("react");

function ManageRideModal({showManage, handleManageClose, currentDrive, fetchDrives, setShowAlert}){

    return(
        <Modal show={showManage} onHide={handleManageClose}>
            <Modal.Header closeButton>
            <Modal.Title> MANAGE PASSENGERS </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                {currentDrive.passengers ? 
                    currentDrive.passengers.map(passenger => <PassengerEntry passenger={passenger} setShowAlert={setShowAlert} fetchDrives={fetchDrives}/>) : null}
            </Modal.Body>
            <Modal.Footer> Double click to remove a passenger. This action is <span className="font-weight-bold">permanent.</span> </Modal.Footer>
        </Modal>
    )}

function PassengerEntry({passenger, fetchDrives, setShowAlert}){

    const {setAlertColor, setAlertStatus} = useContext(UserContext)

    const removePassenger = (id, seats) => {

        // handleManageClose
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
            fetchDrives();
            setShowAlert(true);
            setAlertStatus(data.msg)
            setAlertColor(data.color)
        })      
    }

    return (
    <React.Fragment>
        <Container><Row>
            <Col><p className="ml-4 pt-2">{passenger.name[0]} {passenger.name[1]} ({passenger.seats_requested}) </p></Col> 
            {/* {passenger.req_id} */}
            <Col><button className="btn btn-theme" onDoubleClick={() => removePassenger(passenger.req_id, passenger.seats_requested)}>Remove from ride</button></Col>
        </Row></Container>
    </React.Fragment>
    )
}

    // const managePassengers = () => {
    //     const passengerList = []
    //     if (currentDrive.passengers){
    //         for (const passenger of currentDrive.passengers){                
    //             passengerList.push(
    //                 <React.Fragment>
    //                     <Container><Row>
    //                         <Col><p className="ml-4 pt-2">{passenger.name[0]} {passenger.name[1]} {passenger.req_id}</p></Col> 
    //                         <Col><button className="btn btn-theme" onDoubleClick={() => removePassenger(passenger.req_id, passenger.seats_requested)}>Remove from ride</button></Col>
    //                     </Row></Container>
    //                 </React.Fragment>
    //             )
    //         }
    //     }   
    //     return passengerList
    // }
