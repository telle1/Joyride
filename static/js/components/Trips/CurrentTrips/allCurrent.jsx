function AllCurrentTrips(){
    const {alertStatus, alertColor} = useContext(UserContext)
    const [showAlert, setShowAlert] = useState(false)
    
    return(
        <React.Fragment>
            {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> 
            : null}
            <AllTrips firstTab= {<CurrentDrives setShowAlert={setShowAlert}/>} 
                secondTab= {<CurrentRides setShowAlert={setShowAlert}/>} 
                firstTitle="Drives" secondTitle="Rides"/>
        </React.Fragment>
    )
}