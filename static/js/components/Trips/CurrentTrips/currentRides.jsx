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
                <TableHeader col2="From" col3="To" col4="Driver" col5="cost"></TableHeader>
                <tbody>
                {currentRides.map(currentRide => (
                    <tr>
                        <td>{currentRide.date}</td>
                        <td>{currentRide.start_loc}</td>
                        <td>{currentRide.end_loc}</td>
                        <td>{currentRide.driver[0]} {currentRide.driver[1]}</td>
                        <td>{currentRide.cost}</td>
                        <td>{currentRide.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}