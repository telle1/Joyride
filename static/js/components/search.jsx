const { useState, useEffect } = React 


function Search(){
    const [matchingRides, setMatchingRides] = useState([])
    const [startInput, setStartInput] = useState("")
    const [endInput, setEndInput] = useState("")

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
                    date= {matchingRide.date}
                    driverFirstName= {matchingRide.driver_fname}
                    driverLastName= {matchingRide.driver_lname}
                    seats = {matchingRide.seats}
                    price = {matchingRide.price}
                    comments = {matchingRide.comments}/>
            ))}
        </div>
    )   
}


function MatchingRide({date, driverFirstName, driverLastName, seats, price, comments}){
    return (
            <div className="card mb-3">
                <h5 className="card-header btn-theme"> {date} </h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="card-title font-weight-bold"> {driverFirstName} {driverLastName} </h4>
                        </div>
                        <div className="col-md-4">
                            <div className="card-text text-right"> 
                                <h3 className = "mb-0 font-weight-bold yellow">{seats} seats </h3>
                                <h3 className = "font-weight-bold yellow">${price} each</h3>
                            </div>
                        </div>
                    </div>
                    <p className="card-text">Driver comments: {comments}</p>
                </div>
            </div> 
    )
}