const { useState, useEffect } = React 
const { Col, Accordion } = ReactBootstrap

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

    const sortRides = (evt) => {
        evt.preventDefault()
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
                        <button type="submit" className="btn btn-theme my-1">Search</button>
                    </form>
                </Row>
                <Row>
                    {(matchingRides.length !== 0 && search == true) ? 
                        <form className="ml-3" onSubmit={sortRides}>
                            <label htmlFor="options" className="mr-1">Sort By</label>
                            <select name="options">
                                <option value="date">Date</option>
                                <option value="price">Price</option>
                                <option value="stars">Driver Rating</option>
                            </select>
                        </form>
                    : null} 
                </Row>

           
                {(matchingRides.length == 0 && search == true) ? 
                    <h3 className="mt-3 yellow">No matching rides found. Try again. </h3> :
                    <div>
                    <Row className="mt-3">

                            {matchingRides.map(matchingRide => (
                                <Col xs={6}>
                                    <MatchingRide key = {matchingRide.ride_id} matchingRide = {matchingRide}
                                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                                </Col>
                            ))}
                    </Row>
                    </div>
                }
            </Container>
        </React.Fragment>
    )   
}



