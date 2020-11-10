const { useEffect } = React
const {Container, Tab, Tabs} = ReactBootstrap

function AllCurrentTrips(){
    return(
        <Container className="current-rides">
            <Tabs defaultActiveKey="Driving" id="current-rides-table">
                <Tab eventKey="Driving" title="Driving">
                    <CurrentDrives/>
                </Tab>
                <Tab eventKey="Riding" title="Riding">
                    <CurrentRides/>
                </Tab>
            </Tabs>
        </Container>
    )    
}

function CurrentDrives(){

    const [currentDrives, setCurrentDrives] = useState([])
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
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Seats</th>
                    <th scope="col">Price</th>
                    <th scope="col">Passengers</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                    {currentDrives.map(currentDrive => (
                    <tr>
                        <td>{currentDrive.date}</td>
                        <td>{currentDrive.start_loc} -> {currentDrive.end_loc}</td>
                        <td>{currentDrive.seats}</td>
                        <td>{currentDrive.price}</td>
                        <td>{currentDrive.passengers}</td>
                        <td>{currentDrive.requests}
                        {currentDrive.requests ? (
                        <React.Fragment>
                            <input type="radio" id="approved" name="request_status" value="Approved" required/>
                            <label for="Approved">Approve</label>
                            <input type="radio" id="denied" name="request_status" value="Denied"/>
                            <label for="Denied">Deny</label>
                            <button type="submit" class="btn btn-theme">Confirm</button>
                        </React.Fragment>
                        ) : null}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function CurrentRides(){

    const [currentRides, setCurrentRides] = useState([])

    useEffect(() => {
        fetch("/current-rides", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setCurrentRides(data.rides)
            console.log(data.rides)
        })
    }, [])

    return(
        <div className="riding">
            <h3 className="table-header">RIDING</h3>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Driver</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {currentRides.map(currentRide => (
                    <tr>
                        <td>{currentRide.date}</td>
                        <td>{currentRide.start_loc}</td>
                        <td>{currentRide.end_loc}</td>
                        <td>{currentRide.driver[0]}</td>
                        <td>{currentRide.cost}</td>
                        <td>{currentRide.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}




    
