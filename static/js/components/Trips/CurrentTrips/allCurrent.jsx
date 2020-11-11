function AllCurrentTrips(){
    return(
        <React.Fragment>
            <AllTrips firstTab= {<CurrentDrives/>} secondTab= {<CurrentRides/>} 
                firstTitle="Drives" secondTitle="Rides"/>
        </React.Fragment>
    )
}