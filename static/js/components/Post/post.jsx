const { useState, useEffect } = React 

function Post({setAlertStatus, setAlertColor, alertStatus, alertColor}){

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [date, setDate] = useState('')
    const [seats, setSeats] = useState(0)
    const [price, setPrice] = useState(0)
    const [comments, setComments] = useState('')
    const [showAlert, setShowAlert] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/post-complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: from,
                to: to,
                date: date,
                seats: seats,
                price: price,
                comments: comments
            })
        })
        .then(res => res.json())
        .then(data => {
            setAlertStatus(data.msg)
            setAlertColor('success')
            setShowAlert(true)
        })
    }

    return(
    <React.Fragment>
        <div className="mt-3" id = "msg"> {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
        </div>    
        <div className="container post-ride">
            <div className="row">
            <div className="col-md-5">
                <form onSubmit={handleSubmit} className="f-grey" method="post">
                <h3 className="mb-3"> Post a Ride</h3>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">From</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" name="from_input" id="from_input" placeholder="Start Location" value={from} onChange={(e) => setFrom(e.target.value)} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">To</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" name="to_input" id="to_input" placeholder="End Location" value={to} onChange={(e) => setTo(e.target.value)} required/>
                    </div> 
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Date</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="date" className="form-control" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div> 
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Seats</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="number" className="form-control" name="seats" placeholder="0" min="0" value={seats} onChange={(e) => setSeats(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Price</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="number" className="form-control" name="price" placeholder="0" min="0" value={price} onChange={(e) => setPrice(e.target.value)}/>
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
                <div className="row">
                <button type="submit" className="btn btn-theme ml-auto mr-3" id= "submit-button">Submit</button>
                </div>
                <p id = "alert" className='text-center'></p>
                </form>
            </div>
            <div className="col-md-7">
                <div id="map"></div>
            </div>
        </div>
        </div>
    </React.Fragment>
    )
}

