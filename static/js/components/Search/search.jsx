const { useState, useEffect } = React 
const { Col, Accordion } = ReactBootstrap

function Search({setAlertStatus, setAlertColor, alertStatus, alertColor}){
    const [matchingRides, setMatchingRides] = useState([])
    const [search, setSearch] = useState(false) //prevent "No matching rides" from showing on initial render
    const [startInput, setStartInput] = useState("")
    const [endInput, setEndInput] = useState("")
    const [showAlert, setShowAlert] = useState("")
    const [sort, setSort] = useState("date")

    console.log('START INPUT', startInput)
    console.log('END INPUT', endInput)

    const fetchRides = () => {
        fetch("/search-results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                startInput: startInput,
                endInput: endInput,
                sort: sort,
            }) 
        })
        .then(res => res.json())
        .then(data => {
            setMatchingRides(data.res)
            setSearch(true)
            console.log(matchingRides)
        })   
    }

    const getMatchingRides = (evt) => {
        evt.preventDefault();
        fetchRides();
    }

    const sortRides = (evt) => {
        evt.preventDefault();
        setSort(evt.target.value)
        console.log('tHIS IS WHATS IN SORT', sort)
        fetchRides();
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
                        <SearchBar key="start" input={startInput} setInput={setStartInput} placeholder="Start Location"/>
                        <SearchBar key="end" input={endInput} setInput={setEndInput} placeholder="End Location"/>
                        <button type="submit" className="btn btn-theme my-1">Search</button>
                    </form>
                </Row>
                <Row>
                    {(matchingRides.length !== 0 && search == true) ? 
                        <form className="ml-3">
                            <label htmlFor="options" className="mr-1">Sort By</label>
                            <select name="options" onChange={evt => sortRides(evt)}>
                                <option value="date">Date</option>
                                <option value="price">Price</option>
                                <option value="seats">Seats Available</option>
                            </select>
                        </form>
                    : null} 
                </Row>

                {(matchingRides.length == 0 && search == true) ? 
                    <h3 className="mt-3 yellow">No matching rides found. Try again. </h3> :
                    <Row className="mt-3">
                            {matchingRides.map(matchingRide => (
                                <Col xs={6} key ={matchingRide.ride_id}>
                                    <MatchingRide key ={matchingRide.ride_id} matchingRide = {matchingRide}
                                        setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                                </Col>
                            ))}
                    </Row>
                }
            </Container>
        </React.Fragment>
    )   
}



