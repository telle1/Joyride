const { useState, useEffect } = React 


function Search(){
    //[matchingRides, setMatchingRides] = useState([])
    // [startInput, setStartInput] = useState("")
    // [endInput, setEndInput] = useState("")
    //inputs need an onchange...
    //add onclick to form to run this function
    // const getMatchingRides = (evt) => {
    //     evt.preventDefault();
    //     fetch('/search-results', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             from_input: $('#from_input').val()
    //             to_input: $('#to_input').val()
    //         }) 
    //     })
    //     .then(res => res.json())
    //     .then(data =>...change ur state to render the search results. -> setMatchingRides(data))        
    // }
    // useEffect(() => {
    //     getMatchingRides();
    // }, [finalInput])
    return (
        <div className="container search-container">
            <div className="row">
                <form action='/search-results' className="form-inline mx-auto" id="search-rides">
                    <input type="text" className="form-control mr-2" name="from_input" id = "from_input" placeholder="Start Location" required/>
                    <input type="text" className="form-control mr-2" name="to_input" id= "to_input" placeholder="Destination" required/>
                    <input type="date" className="form-control mr-2" name="date"/>
                    <button type="submit" className="btn btn-theme my-1">Search</button>
                </form>
            </div>
          <div id="msg" className="mt-3"></div>
        </div>

        // matchingRides.map(matchingRide => (
//     <MatchingRide 
//         date= {matchingRide.date}
//         driverFirstName= {matchingRide.date}
//         driverLastName= {matchingRide.date}
//         seats = {matchingRide.seats}
//         price = {matchingRide.price}
//         comments = {matchingRide.comments}
// )
    )
}



// function MatchingRides({date, driverFirstName, driverLastName, seats, price}){
//     <div class="col-md-6">
//     <div class="card mb-3">
//         <h5 class="card-header btn-theme">{{date}} </h5>
//         <div class="card-body">
//           <div class="row">
//             <div class="col-md-8">
//               <h4 class="card-title font-weight-bold">{{driverFirstName}} {{driverLastName}}</h4>
//             </div>
//             <div class="col-md-4">
//               <div class="card-text text-right"> 
//                <h3 class = "mb-0 font-weight-bold">{{seats}} seats </h3>
//                <h3 class = "font-weight-bold">${{price}} each</h3>
//               </div>
//             </div>
//           </div>
//             <p class="card-text">Driver comments: {{comments}}</p>
//             <p class="card-text">driverid = {{ride.driver_id}} rideid = {{ride.ride_id}}</p>
//             <input type="hidden" value = {{ride.driver_id}} name = "driver_id" id = "driver_id"> 
//             <input type="hidden" value = {{ride.ride_id}} name = "ride_id" id = "ride_id"> 
    
//             <button class="btn btn-theme" data-toggle="modal" data-target="#req-{{ride.ride_id}}">Request ride</button>
    
//         </div>
//     </div> 
//     </div> 
    
// }