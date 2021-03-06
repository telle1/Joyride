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
