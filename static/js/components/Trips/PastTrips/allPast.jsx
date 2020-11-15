const { useEffect } = React
const {Container, Tab, Tabs} = ReactBootstrap

function PastTrips({user, alertColor, alertStatus, setAlertColor, setAlertStatus}){
    const [showAlert, setShowAlert] = useState(false)

    return(
        <React.Fragment>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
            <AllTrips firstTab= {<PastDrives user={user} setShowAlert={setShowAlert} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus}/>} secondTab= {<PastRides user={user}/>} 
                firstTitle="Past Drives" secondTitle="Past Rides"/>
        </React.Fragment>
    )
}