function RadioButton({request_id, seats, setAlertColor, setAlertStatus, setShowAlert, fetchDrives}){

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
            fetchDrives();
        })
    }

    console.log('THIS IS THE REQUEST ID', request_id)
    console.log('STATUS', rideStatus)

    return (
    <Form onSubmit={handleStatus} method="post">
         <label htmlFor="Approved" className="radio-check">
            <input type="radio" className="radio-hide ml-2 radio-check" checked={rideStatus === 'Approved'} name="request_status" value="Approved" id="Approved" onClick={()=>setRideStatus('Approved')} required />
            <i className="fas fa-check ml-1 mr-2 radio-check" style={{color: "green"}}></i>
        </label>

        <input type="radio" className="radio-hide" checked={rideStatus === 'Denied'} name="request_status" value="Denied" onClick={()=>setRideStatus('Denied')}/>
        <label htmlFor="Denied"><i className="fas fa-times ml-1" style={{color: "red"}}></i></label>

        <button type="submit" className="ml-2 btn btn-theme">Confirm</button>
    </Form>
    )
}