const { useEffect } = React
const {Container, Tab, Tabs} = ReactBootstrap

function PastTrips(){
    return(
        <React.Fragment>
            <AllTrips firstTab= {<PastDrives/>} secondTab= {<PastRides/>} 
                firstTitle="Past Drives" secondTitle="Past Rides"/>
        </React.Fragment>
    )
}