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

    const passenger = () => {
        const passengerList = []
        if (pastDrive.passengers){
            for (const passenger of pastDrive.passengers){                
                passengerList.push(<React.Fragment>{passenger[0]} {passenger[1]}<br/></React.Fragment>)
            }
        }   
        return passengerList
    }

    return (
            <tr>
                <td>{pastDrive.date}</td>
                <td>{pastDrive.start_loc} -> {pastDrive.end_loc}</td>
                <td>{pastDrive.seats}</td>
                <td>${pastDrive.price}</td>
                <td>{passenger()}</td>
            </tr>
    )
}