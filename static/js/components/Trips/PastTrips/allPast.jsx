const { useEffect } = React
const {Container, Tab, Tabs} = ReactBootstrap

function PastTrips({user}){
    return(
        <React.Fragment>
            <AllTrips firstTab= {<PastDrives user={user}/>} secondTab= {<PastRides user={user}/>} 
                firstTitle="Past Drives" secondTitle="Past Rides"/>
        </React.Fragment>
    )
}