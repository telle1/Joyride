function CurrentRides(){

    const [currentDrives, setCurrentDrives] = useState([])
    const [currentRides, setCurrentRides] = useState([])

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

    return(
        <div className="container">
            <ul className="nav nav-tabs">
                <li className="mr-2">
                <a data-toggle="tab" href="#driving">Driving</a>
                </li>
                <li>
                <a data-toggle="tab" href="#riding">Riding</a>
                </li>
            </ul>  

            <div className="msg mt-3" id="msg"></div>

            <div className="tab-content">
                <div id="driving" className="tab-pane fade in active">
                <h3>DRIVING</h3>
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
                                <input type="radio" id="approved" name="request_status-{{req.request_id}}" value="Approved" required/>
                                <label for="Approved">Approve</label>
                                <input type="radio" id="denied" name="request_status-{{req.request_id}}" value="Denied"/>
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

                <div id="riding" className="tab-pane">
                <h3>RIDING</h3>
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
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tbody>
                </table>
                </div>
            </div> 
        </div>
    )    
}