function AllCurrentTrips({alertColor, alertStatus, setAlertColor, setAlertStatus}){
    const [showAlert, setShowAlert] = useState(false)
    
    return(
        <React.Fragment>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
            <AllTrips firstTab= {<CurrentDrives setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>} 
                secondTab= {<CurrentRides setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>} 
                firstTitle="Drives" secondTitle="Rides"/>
        </React.Fragment>
    )
}