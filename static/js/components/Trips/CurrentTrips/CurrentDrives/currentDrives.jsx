const { useState, useEffect } = React 

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
    }, []) //set to currentDrives
    
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

    //Cancel Modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 
    //Edit Modal
    const [showEdit, setShowEdit] = useState(false)
    const handleEditShow = () => setShowEdit(true)
    const handleEditClose = () => setShowEdit(false) 


    const request = () => {

        const requestList = []
        if (currentDrive.requests){
            for (const request of currentDrive.requests){
                //Contact Info Modal
                const [showInfo, setShowInfo] = useState(false)
                const handleInfoShow = () => setShowInfo(true)
                const handleInfoClose = () => setShowInfo(false) 

                requestList.push(<p>
                    <button className="btn btn-transparent mr-2" onClick={handleInfoShow}>{request.name} {request.id}</button>
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
                passengerList.push(<p className="mb-0">{passenger[0]} {passenger[1]}</p>)
            }
        }   
        return passengerList
    }

    return(
        <tr>
            <td>
                {currentDrive.date} RIDE ID{currentDrive.ride_id}
                <div>
                <button className="btn btn-theme mr-2" onClick={handleEditShow}>Edit Ride</button>
                <button className="btn btn-yellow" onClick={handleShow}>Delete Ride</button>
                <DelRideModal show={show} handleClose={handleClose} ride_id={currentDrive.ride_id}/>
                <EditRideModal showEdit={showEdit} handleEditClose={handleEditClose} passengers={currentDrive.passengers}
                    ride_id={currentDrive.ride_id} oldSeats={currentDrive.seats} oldPrice={currentDrive.price} oldComments={currentDrive.comments}
                    oldDate={currentDrive.date} oldFrom={currentDrive.start_loc} oldTo={currentDrive.end_loc}/>
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








    
    
    