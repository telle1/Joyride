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

    const request = () => {
        const requestList = []
        if (currentDrive.requests){
            for (const request of currentDrive.requests){
                requestList.push(<p>{request.name} {request.id} <RadioButton request_id={request.id}
                    setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/></p>)
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
            <td>{currentDrive.date} RIDE ID{currentDrive.ride_id}</td>
            <td>{currentDrive.start_loc} -> {currentDrive.end_loc}</td>
            <td>{currentDrive.seats}</td>
            <td>{currentDrive.price}</td>
            <td>{passenger()}</td>
            <td>{request()}</td>
        </tr>
    )
}

function RadioButton({request_id, setAlertColor, setAlertStatus, setShowAlert}){

    const [rideStatus, setRideStatus] = useState(null)

    const handleStatus = (evt) => {
        evt.preventDefault()

        console.log('REQUEST ID WHEN SUBMITTED', request_id)
        console.log('STATUS WHEN SUBMITTED', rideStatus)

        fetch("/confirm-rides", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id: request_id,
                status: rideStatus
            })
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setAlertStatus(data.msg)
            setShowAlert(true)
            setAlertColor(data.alert_color)
        })
    }

    console.log('THIS IS THE REQUEST ID', request_id)
    console.log('STATUS', rideStatus)

    return (
    <form onSubmit={handleStatus} method="post">
        <input type="radio" checked={rideStatus === 'Approved'} name="request_status" value="Approved" onClick={()=>setRideStatus('Approved')} required />
        <label for="Approved">Approve</label>

        <input type="radio" checked={rideStatus === 'Denied'} name="request_status" value="Denied" onClick={()=>setRideStatus('Denied')}/>
        <label for="Denied">Deny</label>

        <button type="submit" class="btn btn-theme">Confirm</button>
    </form>
    )
}



// function currentRide(){
//     let rideList = []
//     for (let i=0; i<currentRides.length; i++){
//         let currentRide = currentRides[i];

//         rideList.push(<RideListItem currentRide = {currentRide}/>)

//     }
//     console.log('HELLLO', rideList)
//     return rideList
//then call currentRide() in your return
// }

