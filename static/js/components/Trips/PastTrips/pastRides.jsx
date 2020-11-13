function PastRides(){

    const [pastRides, setPastRides] = useState([])

    useEffect(() => {
        fetch("/past-rides", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setPastRides(data.rides)
            console.log(data.rides)
        })
    }, [])

    return(
        <div className="Rode">
            <h3 className="table-header">RODE</h3>
            <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Driver</th>
                    <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
                {pastRides.map(pastRide => (
                    <tr>
                        <td>{pastRide.date}</td>
                        <td>{pastRide.start_loc}</td>
                        <td>{pastRide.end_loc}</td>
                        <td>{pastRide.driver[0]} {pastRide.driver[1]}</td>
                        <td>{pastRide.cost}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}