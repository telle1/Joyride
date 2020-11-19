function PastDrives({user, setAlertColor, setAlertStatus, setShowAlert}){

    const [pastDrives, setPastDrives] = useState([])

    const fetchPastDrives = () => {
        fetch("/past-rides")
        .then(res => res.json())
        .then(data => {
            setPastDrives(data.drives)
        })
    }

    useEffect(() =>{
        fetchPastDrives();
    }, [])

    return (
        <React.Fragment>
            <h3 className="table-header">DROVE</h3>
            <Table bordered striped hover>
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
                    {pastDrives.map(pastDrive => <PastDrive pastDrive={pastDrive} user={user} 
                        fetchPastDrives={fetchPastDrives} setShowAlert={setShowAlert} 
                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus}/>
                    )}
                </tbody>
            </Table>
        </React.Fragment>
    )          
}

function PastDrive({pastDrive, user, setAlertColor, setAlertStatus, setShowAlert, fetchPastDrives}){

    return (
            <tr>
                <td> 
                    {pastDrive.date} {pastDrive.ride_id}
                    <br/>
                    {pastDrive.passengers ? <span className="yellow">{pastDrive.feedback_count} of {pastDrive.passengers.length} feedback received.</span> 
                        : null}
                </td>
                <td> {pastDrive.start_loc} -> {pastDrive.end_loc}</td>
                <td> {pastDrive.seats}</td>
                <td> ${pastDrive.price}</td>
                <td> <PastPassengersList pastDrive={pastDrive} user={user} fetchPastDrives={fetchPastDrives}
                        setShowAlert={setShowAlert} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus}/>
                </td>
            </tr>
    )
}

function PastPassengersList({pastDrive, user, setAlertColor, setAlertStatus, setShowAlert, fetchPastDrives}){

    return (
        <React.Fragment>
            {pastDrive.passengers ? 
                pastDrive.passengers.map(passenger => <PastPassenger pastDrive={pastDrive} 
                    fetchPastDrives={fetchPastDrives} passenger={passenger} user={user}
                    setShowAlert={setShowAlert} setAlertColor={setAlertColor} 
                    setAlertStatus={setAlertStatus}/>)
                : null}
        </React.Fragment>
    )
}

function PastPassenger({passenger, pastDrive, user, setAlertColor, setAlertStatus, setShowAlert, fetchPastDrives}){

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 

    return (
        <React.Fragment>
            <button className="btn-transparent" onClick={handleShow}>
                {passenger.first_name} {passenger.last_name}
            </button>
            <br/>
            <DriverFeedbackModal show={show} handleClose={handleClose} pastDrive={pastDrive} 
                user={user} fetchPastDrives={fetchPastDrives} passenger={passenger} 
                setShowAlert={setShowAlert} setAlertColor={setAlertColor} 
                setAlertStatus={setAlertStatus}/>
        </React.Fragment>
    )
}


function DriverFeedbackModal({show, handleClose, pastDrive, user, passenger, setAlertColor, setAlertStatus, setShowAlert, fetchPastDrives}){

    const [rating, setRating] = useState(0)
    const [feedback, setFeedback] = useState("")

    const sendFeedback = (e) => {
        e.preventDefault();
        fetch('/give-passenger-feedback',  {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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
            setAlertStatus(data.msg)
            setAlertColor(data.color)
            setShowAlert(true)
            fetchPastDrives();
        })
    }

    return(
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>FEEDBACK </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <Form onSubmit={sendFeedback} method="post">  
                    <Link to={`/profile/${passenger.id}`}>{passenger.first_name} {passenger.last_name}</Link>
                    <div>
                        <StarRating rating={rating} setRating={setRating} cursor="cursor-pointer"/>
                    </div>
                    <div className="form-group mb-4 mt-2">
                        <textarea className="form-control" placeholder="Feedback" rows="3" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>  
                    </div>   
                    <div className="form-group mb-4">
                        <button type="submit" className="btn btn-theme form-control" onClick={handleClose}>Submit</button> 
                    </div>  
            </Form>
        </Modal.Body>
    </Modal>
)}
    
    

