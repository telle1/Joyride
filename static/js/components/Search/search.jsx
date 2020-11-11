const { useState, useEffect } = React 
const { Col } = ReactBootstrap


function Search({setAlertStatus, setAlertColor, alertStatus, alertColor}){
    const [matchingRides, setMatchingRides] = useState([])
    const [startInput, setStartInput] = useState("")
    const [endInput, setEndInput] = useState("")
    const [showAlert, setShowAlert] = useState("")

    const getMatchingRides = (evt) => {
        evt.preventDefault()
        fetch("/search-results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                startInput: startInput,
                endInput: endInput
            }) 
        })
        .then(res => res.json())
        .then(data => {
            setMatchingRides(data.res)
            console.log(matchingRides)
        })        
    }

    return (
        <React.Fragment>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
            <div className="container search-container">
                <div className="row">
                    <form onSubmit={getMatchingRides} className="form-inline mx-auto" id="search-rides" method="post">
                        <input type="text" className="form-control mr-2" name="from_input" id = "from_input" value={startInput} onChange={(e)=>setStartInput(e.target.value)} placeholder="Start Location" required/>
                        <input type="text" className="form-control mr-2" name="to_input" id= "to_input" value={endInput} onChange={(e)=>setEndInput(e.target.value)} placeholder="Destination" required/>
                        <input type="date" className="form-control mr-2" name="date"/>
                        <button type="submit" className="btn btn-theme my-1">Search</button>
                    </form>
                </div>
                {matchingRides.map(matchingRide => (
                    <MatchingRide 
                        key = {matchingRide.ride_id}
                        rideID = {matchingRide.ride_id}
                        date= {matchingRide.date}
                        driverFirstName= {matchingRide.driver_fname}
                        driverLastName= {matchingRide.driver_lname}
                        seats = {matchingRide.seats}
                        price = {matchingRide.price}
                        comments = {matchingRide.comments}
                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                ))}
            </div>
        </React.Fragment>
    )   
}




