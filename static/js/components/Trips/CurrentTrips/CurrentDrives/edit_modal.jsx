function EditRideModal({showEdit, handleEditClose, ride_id, oldSeats, oldPrice, oldComments, passengers, oldDate, oldFrom, oldTo}){

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