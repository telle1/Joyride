const { useEffect } = React
const {Container, Tab, Tabs} = ReactBootstrap

function PastTrips(){
    const [showAlert, setShowAlert] = useState(false)
    const {alertColor, alertStatus} = useContext(UserContext)

    return(
        <React.Fragment>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> 
            : null}
            <AllTrips firstTab= {<PastDrives setShowAlert={setShowAlert}/>} 
                secondTab= {<PastRides/>} firstTitle="Past Drives" 
                secondTitle="Past Rides"/>
        </React.Fragment>
    )
}

// past drives user={user} setShowAlert={setShowAlert} 
// setAlertColor={setAlertColor} setAlertStatus={setAlertStatus}
// past rides  user={user}/>