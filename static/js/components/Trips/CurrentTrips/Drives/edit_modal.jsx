function EditRideModal({showEdit, handleEditClose, currentDrive, setAlertColor, setAlertStatus, setShowAlert, fetchDrives}){

    const [seats, setSeats] = useState(currentDrive.seats)
    const [price, setPrice] = useState(currentDrive.price)
    const [comments, setComments] = useState(currentDrive.comments)
    const [date, setDate] = useState(currentDrive.date)
    const [from, setFrom] = useState(currentDrive.start_loc)
    const [to, setTo] = useState(currentDrive.end_loc)

    const editRide = (evt) => {

        evt.preventDefault()     
        console.log('THIS IS THE RIDE INFO UPDATED', 'RIDE_ID', currentDrive.ride_id, 'seats', seats, 'price', 
        price, 'comments', comments, 'date', date, 'from', from, 'to', to)

        fetch("/edit-ride", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ride_id: currentDrive.ride_id,
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
            setAlertStatus(data.msg)
            setAlertColor(data.color)
            setShowAlert(true)
            fetchDrives();
        })      
    }

return(
    <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
        <Modal.Title>EDIT RIDE </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <form onSubmit={editRide} className="ml-3 mr-3" method="post">
            {currentDrive.passengers  ? null : 
                    <div>
                        <div className="form-group row">
                            <div className = "col-md-3 col-form-label">
                            <label htmlFor="#">From</label>
                            </div>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="from_input" 
                                value={from} onChange={(e) => setFrom(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className = "col-md-3 col-form-label">
                            <label htmlFor="#">To</label>
                            </div>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="to_input" 
                                value={to} onChange={(e) => setTo(e.target.value)} required/>
                            </div> 
                        </div>
                        <div className="form-group row">
                            <div className = "col-md-3 col-form-label">
                            <label htmlFor="#">Date</label>
                            </div>
                            <div className="col-sm-9">
                            <input type="date" className="form-control" name="date" 
                                value={date} onChange={(e) => setDate(e.target.value)}/>
                            </div> 
                        </div>
                    </div> 
            }
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Seats</label>
                    </div>
                    <div className="col-sm-9">
                     <input type="number" className="form-control" name="seats" min="0" 
                        value={seats} onChange={(e) => setSeats(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Price</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="number" className="form-control" name="price" min="0"
                        value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Comments</label>
                    </div>
                    <div className="col-sm-9">
                    <textarea className="form-control" name="comments" rows="5" 
                        value={comments} onChange={(e) => setComments(e.target.value)}>
                    </textarea>
                    </div>
                </div>
                <div className="form-group mt-4">
                        <button type="submit" className="btn btn-theme form-control" 
                        onClick={handleEditClose}> Edit ride</button> 
                </div>
        </form>
        </Modal.Body>
    </Modal>
)}