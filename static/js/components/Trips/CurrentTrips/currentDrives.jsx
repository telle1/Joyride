function CurrentDrives(){

    const [currentDrives, setCurrentDrives] = useState([])
    const [rideStatus, setRideStatus] = useState(null)

    console.log('THIS IS THE RIDE STATUS', rideStatus)

    //might have to change how many times this is called/ everytime currentdrives changes..
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
    }, [])
    
    return (
        <div>
            <h3 className="table-header">DRIVING</h3>
            <table className="table table-bordered table-striped">
                <TableHeader col2="Location" col3="Seats" col4="Price" col5="Passengers"></TableHeader>
                <tbody>
                    {currentDrives.map(currentDrive => (
                    <tr>
                        <td>{currentDrive.date}</td>
                        <td>{currentDrive.start_loc} -> {currentDrive.end_loc}</td>
                        <td>{currentDrive.seats}</td>
                        <td>{currentDrive.price}</td>
                        <td>{currentDrive.passengers}</td>
                        <td>{currentDrive.requests}
                            {currentDrive.requests ? <RadioButton rideStatus ={rideStatus} setRideStatus={setRideStatus} request_id={currentDrive.request_id}></RadioButton> : null}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function RadioButton({setRideStatus, rideStatus, request_id}){

    const handleStatus = (evt) => {
        evt.preventDefault()
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
            console.log(data)
        })
    }

    console.log('THIS IS THE REQUEST ID', request_id)

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




