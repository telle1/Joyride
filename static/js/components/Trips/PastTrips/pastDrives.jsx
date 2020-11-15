function PastDrives({user}){

    const [pastDrives, setPastDrives] = useState([])

    //might have to change how many times this is called/ everytime cpasttdrives changes..
    useEffect(() =>{
        fetch("/past-rides", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setPastDrives(data.drives)
        })
    }, [])

    return (
        <div>
        <h3 className="table-header">DROVE</h3>
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Seats</th>
                <th scope="col">Price</th>
                <th scope="col">Passengers</th>
            </tr>
            </thead>
            <tbody>
                {pastDrives.map(pastDrive => <PastDrive pastDrive={pastDrive} user={user}/>)}
            </tbody>
            </table>
        </div>
    )          
}

function PastDrive({pastDrive, user}){

    return (
            <tr>
                <td>{pastDrive.date} {pastDrive.ride_id}
                    <br/>{pastDrive.passengers ? <span className="yellow">{pastDrive.feedback_count} of {pastDrive.passengers.length} feedback received.</span> : null}
                </td>
                <td>{pastDrive.start_loc} -> {pastDrive.end_loc}</td>
                <td>{pastDrive.seats}</td>
                <td>${pastDrive.price}</td>
                <td><PastPassengersList pastDrive={pastDrive} user={user}/></td>
            </tr>
    )
}

function PastPassengersList({pastDrive, user}){

    return (
        <React.Fragment>
        {pastDrive.passengers ? pastDrive.passengers.map(passenger => <PastPassenger pastDrive={pastDrive} passenger={passenger} user={user}/>)
            : null}
        </React.Fragment>
    )
}

function PastPassenger({passenger, pastDrive, user}){

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 

    return (
        <React.Fragment><button className="btn-transparent" onClick={handleShow}>{passenger.first_name} {passenger.last_name}</button><br/>
        <DriverFeedbackModal show={show} handleClose={handleClose} pastDrive={pastDrive} user={user}
        passenger={passenger}/></React.Fragment>
    )
}


function DriverFeedbackModal({show, handleClose, pastDrive, user, passenger}){

    const [rating, setRating] = useState(1)
    const [feedback, setFeedback] = useState("")

    const sendFeedback = (e) => {
        e.preventDefault();
        fetch('/give-passenger-feedback',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'feedback': feedback,
                'rating': rating,
                'giver': user,
                'receiver': passenger.id,
                'ride_id': pastDrive.ride_id
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg)
        })
    }

         return(
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>FEEDBACK </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <form onSubmit={sendFeedback} method="post">  
                            <p>{passenger.first_name} {passenger.last_name}</p>
                            <div>
                                <label htmlFor="rating" className="mr-2 mb-2">Rating</label>
                                <input type="number" placeholder="1" value={rating} onChange={(e) => setRating(e.target.value)}></input>    
                            </div>
                            <div className="form-group mb-4 mt-2">
                                <textarea className="form-control" placeholder="Feedback" rows="3" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>  
                            </div>   
                            <div className="form-group mb-4">
                                <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Submit</button> 
                            </div>  
                    </form>
                </Modal.Body>
            </Modal>
        )}
    
    

