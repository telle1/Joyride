const { useState, useEffect } = React 
const { Col } = ReactBootstrap


function Search({setAlertStatus, setAlertColor, alertStatus, alertColor}){
    const [matchingRides, setMatchingRides] = useState([])
    const [search, setSearch] = useState(false) //prevent "No matching rides" from showing on initial render
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
            setSearch(true)
            console.log(matchingRides)
        })        
    }

    return (
        <React.Fragment>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
            <div className="container top-padding">
                <div className="row">
                    <form onSubmit={getMatchingRides} className="form-inline mx-auto" id="search-rides" method="post">
                        <input type="text" className="form-control mr-2" name="from_input" id = "from_input" value={startInput} onChange={(e)=>setStartInput(e.target.value)} placeholder="Start Location" required/>
                        <input type="text" className="form-control mr-2" name="to_input" id= "to_input" value={endInput} onChange={(e)=>setEndInput(e.target.value)} placeholder="Destination" required/>
                        <input type="date" className="form-control mr-2" name="date"/>
                        <button type="submit" className="btn btn-theme my-1">Search</button>
                    </form>
                </div>
                {(matchingRides.length == 0 && search == true) ? 
                <h3 className="mt-3 yellow">No matching rides found. Try again. </h3> :
                <Row className="mt-3">
                {matchingRides.map(matchingRide => (
                    <Col xs={6} className="mt-3">
                    <MatchingRide 
                        key = {matchingRide.ride_id} matchingRide = {matchingRide}
                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                    </Col>
                ))}
                </Row>
                }
           
            </div>
        </React.Fragment>
    )   
}



