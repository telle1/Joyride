const { useState, useEffect } = React 
const { Col } = ReactBootstrap

function Search({setAlertStatus, setAlertColor, alertStatus, alertColor}){
    const [matchingRides, setMatchingRides] = useState([])
    const [search, setSearch] = useState(false) //prevent "No matching rides" from showing on initial render
    const [startInput, setStartInput] = useState("")
    const [endInput, setEndInput] = useState("")
    const [showAlert, setShowAlert] = useState("")

    console.log('START INPUT', startInput)
    console.log('END INPUT', endInput)

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
            <div className="text-center text-header animated bounce top-padding mb-5">
            <h1>Where to next?</h1>
            </div>
            <Container>
                <Row>
                    <form onSubmit={getMatchingRides} className="form-inline mx-auto" id="search-rides" method="post">
                        <SearchBar input={startInput} setInput={setStartInput} placeholder="Start Location"/>
                        <SearchBar input={endInput} setInput={setEndInput} placeholder="End Location"/>
                        <input type="date" className="form-control mr-2" name="date"/>
                        <button type="submit" className="btn btn-theme my-1">Search</button>
                    </form>
                </Row>
           
                {(matchingRides.length == 0 && search == true) ? 
                    <h3 className="mt-3 yellow">No matching rides found. Try again. </h3> :
                    <Row className="mt-3">
                        {matchingRides.map(matchingRide => (
                            <Col xs={6} className="mt-3">
                            <MatchingRide key = {matchingRide.ride_id} matchingRide = {matchingRide}
                                setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                            </Col>
                        ))}
                    </Row>
                }
            </Container>
        </React.Fragment>
    )   
}



