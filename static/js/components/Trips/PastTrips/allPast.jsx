const { useEffect } = React
const {Container, Tab, Tabs} = ReactBootstrap

function PastTrips({user}){
    return(
        <React.Fragment>
            <AllTrips firstTab= {<PastDrives/>} secondTab= {<PastRides user={user}/>} 
                firstTitle="Past Drives" secondTitle="Past Rides"/>
        </React.Fragment>
    )
}