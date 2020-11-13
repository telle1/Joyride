function RadioButton({request_id, seats, setAlertColor, setAlertStatus, setShowAlert}){

    const [rideStatus, setRideStatus] = useState(null)

    const handleStatus = (evt) => {
        evt.preventDefault()

        console.log('REQUEST ID WHEN SUBMITTED', request_id)
        console.log('SEATS WHEN SUBMITTED', seats)
        console.log('STATUS WHEN SUBMITTED', rideStatus)

        fetch("/confirm-rides", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id: request_id,
                status: rideStatus,
                seats: seats
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
        <label htmlFor="Approved">Approve</label>

        <input type="radio" checked={rideStatus === 'Denied'} name="request_status" value="Denied" onClick={()=>setRideStatus('Denied')}/>
        <label htmlFor="Denied">Deny</label>

        <button type="submit" className="btn btn-theme">Confirm</button>
    </form>
    )
}