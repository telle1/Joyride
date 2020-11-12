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

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 

    const [showEdit, setShowEdit] = useState(false)
    const handleEditShow = () => setShowEdit(true)
    const handleEditClose = () => setShowEdit(false) 

    // const [showFullEdit, setShowFullEdit] = useState(false)
    // const handleFullEditShow = () => setShowFullEdit(true)
    // const handleFullEditClose = () => setShowFullEdit(false) 

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
            <td>
                {currentDrive.date} RIDE ID{currentDrive.ride_id}
                <div>
                <Button className="btn-theme mr-2" onClick={handleEditShow}>Edit Ride</Button>
                <Button className="btn-yellow" onClick={handleShow}>Delete Ride</Button>
                <DelRideModal show={show} handleClose={handleClose} ride_id={currentDrive.ride_id}/>
                {/* {currentDrive.passengers ? :} */}
                <EditRideModal showEdit={showEdit} handleEditClose={handleEditClose} passengers={currentDrive.passengers}
                    ride_id={currentDrive.ride_id} oldSeats={currentDrive.seats} oldPrice={currentDrive.price} oldComments={currentDrive.comments}
                    oldDate={currentDrive.date} oldFrom={currentDrive.start_loc} oldTo={currentDrive.end_loc}/>
                {/* <FullEditRideModal showFullEdit={showFullEdit} handleFullEditClose={handleFullEditClose} 
                    ride_id={currentDrive.ride_id} oldSeats={currentDrive.seats} oldPrice={currentDrive.price} oldComments={currentDrive.comments}
                    oldDate={currentDrive.date} oldFrom={currentDrive.start_loc} oldTo={currentDrive.end_loc}/> */}
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

function EditRideModal({showEdit, handleEditClose, ride_id, oldSeats, oldPrice, oldComments, passengers, oldDate, oldFrom, oldTo}){

    console.log('PASSENGERERSGGRGSRSG', passengers)

    const [seats, setSeats] = useState(oldSeats)
    const [price, setPrice] = useState(oldPrice)
    const [comments, setComments] = useState(oldComments)

    const [date, setDate] = useState(oldDate)
    const [from, setFrom] = useState(oldFrom)
    const [to, setTo] = useState(oldTo)

    const editRide = (evt) => {

        evt.preventDefault()     
        console.log('THIS IS THE RIDE INFO', 'RIDE_ID', ride_id, 'seats', seats, 'price', price, 'comments', comments, 'date', date, 'from', from, 'to', to)

        //if a field is empty, set it to the old value...

        fetch("/edit-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ride_id: ride_id,
                seats: seats,
                price: price,
                comments: comments,
                date: date,
                from: from,
                to: to
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg) 
        })      
    }

return(
    <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
        <Modal.Title>EDIT RIDE </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <form onSubmit={editRide} className="ml-3 mr-3" method="post">
            {passengers  ? null : 
                    <div>
                        <div className="form-group row">
                            <div className = "col-md-3 col-form-label">
                            <label htmlFor="#">From</label>
                            </div>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="from_input" placeholder={oldFrom} value={from} onChange={(e) => setFrom(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className = "col-md-3 col-form-label">
                            <label htmlFor="#">To</label>
                            </div>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="to_input" placeholder={oldTo} value={to} onChange={(e) => setTo(e.target.value)} required/>
                            </div> 
                        </div>
                        <div className="form-group row">
                            <div className = "col-md-3 col-form-label">
                            <label htmlFor="#">Date</label>
                            </div>
                            <div className="col-sm-9">
                            <input type="date" className="form-control" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                            </div> 
                        </div>
                    </div> 
            }
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Seats</label>
                    </div>
                    <div className="col-sm-9">
                     <input type="number" className="form-control" name="seats" placeholder= {oldSeats} min="0" value={seats} onChange={(e) => setSeats(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Price</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="number" className="form-control" name="price" placeholder={oldPrice} min="0" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Comments</label>
                    </div>
                    <div className="col-sm-9">
                    <textarea className="form-control" name="comments" rows="5" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="form-group mt-4">
                        <button type="submit" className="btn btn-theme form-control" onClick={handleEditClose}>Edit ride</button> 
                </div>
        </form>
        </Modal.Body>
    </Modal>
)}

function DelRideModal({show, handleClose, ride_id}){

    const handleRemove = (evt) => {
        evt.preventDefault()     
        console.log('THIS IS THE RIDE ID', ride_id)
        fetch("/delete-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ride_id: ride_id
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg) 
        })      
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>CANCEL CONFIRMATION </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={handleRemove} method="post">       
                        <div className="form-group- mb-2">
                            <p className="ml-1 mr-1">Are you sure you want to <span className="font-weight-bold">permanently</span> delete this ride? Joyriders are counting on you!</p>
                        </div>   
                        <div className="form-group mb-4">
                            <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Cancel ride</button> 
                        </div>  
                    </form>
            </Modal.Body>
        </Modal>
    )}


