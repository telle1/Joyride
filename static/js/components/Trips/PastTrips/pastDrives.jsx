function PastDrives(){

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
                {pastDrives.map(pastDrive => <PastDrive pastDrive={pastDrive}/>)}
            </tbody>
            </table>
        </div>
    )          
}

function PastDrive({pastDrive}){

    //Feedback Modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false) 

    return (
            <tr>
                <td>{pastDrive.date}
                    <div><button className="btn btn-yellow" onClick={handleShow}>Feedback</button></div>
                    <FeedbackModal show={show} handleClose={handleClose} pastDrive={pastDrive}/>
                </td>
                <td>{pastDrive.start_loc} -> {pastDrive.end_loc}</td>
                <td>{pastDrive.seats}</td>
                <td>${pastDrive.price}</td>
                <td><Passengers pastDrive={pastDrive}/></td>
            </tr>
    )
}

function Passengers({pastDrive}){
    return (
        <React.Fragment>
        {pastDrive.passengers ? pastDrive.passengers.map(passenger => 
            <React.Fragment>{passenger[0]} {passenger[1]}<br/></React.Fragment>) : null}
        </React.Fragment>
    )
}


function FeedbackModal({show, handleClose, pastDrive}){

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>PASSENGER FEEDBACK </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <p>test</p>
            </Modal.Body>
        </Modal>
    )}

