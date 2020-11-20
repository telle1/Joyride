function NotificationRow({ride}){

    const [iconBgColor, setIconBgColor] = useState("")
    const [icon, setIcon] = useState("")
    const [textBgColor, setTextBgColor] = useState("")
    const [date, setDate] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        console.log('rIDE STATUSES', ride.status)
        // if ride.status == ''

    })


    return (
        <tr>
            <td className="py-0"> 
                <Row>
                    {/* <Col xs={1} className={`${iconBgColor} d-flex justify-content-center align-items-center`}>
                        <i className={`${icon}`}></i>
                    </Col>
                    <Col className={`${textBgColor}`}>
                        <div className="d-inline float-right pt-2 text-muted"><sup>{date}</sup>
                        </div>
                        <h5 className="py-3 mb-0 gray-text">{message}</h5>
                    </Col> */}
                    <p>test</p>
                </Row>
            </td>
        </tr>
    )
}




function Notifications(){
   
    const [rides, setRides] = useState([])
    console.log('NOTIFS', rides)

    const fetchNotifications = () => {
        fetch('/current-rides')
        .then(res => res.json())
        .then(data => {
            console.log(data, 'DATA')
            setRides(data.rides)
        })
    }   

    useEffect(() =>{
        fetchNotifications();
    }, [])

 
    return (
        <React.Fragment>
                <h3 className="yellow">Notifications</h3>
                <div className="notification-wrap">
                    <Table bordered>
                        <tbody>
                            {rides.map(ride => { 
                                {console.log(ride.status, 'THIS IS THE STATUS')}
                                ride.status !== 'Pending' ? <NotificationRow ride={ride}/> : null
                            })}
                             {/* <tr>
                                <td className="py-0"> 
                                <Row>
                                <Col xs={1} className="dark-blue d-flex justify-content-center align-items-center">
                                <i className="fas fa-info-circle fa-2x white-icon"></i>
                                </Col>
                                <Col className="blue">
                                    <div className="d-inline float-right pt-2 text-muted"><sup>November 18, 2020</sup>
                                    </div>
                                    <h5 className="py-3 mb-0 black">Request for SF to LA has been approved. Test. Test. 
                                    Request for SF to LA has been approved. </h5>
                                </Col>
                                </Row>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-0"> 
                                <Row>
                                <Col xs={1} className="notif-color d-flex justify-content-center align-items-center">
                                <i className="fas fa-frown fa-2x"></i>
                                </Col>
                                <Col>
                                    <div className="d-inline float-right pt-2 text-muted"><sup>November 18, 2020</sup>
                                    </div>
                                    <h5 className="py-3 mb-0 salmon-icon">Request for SF to LA has been approved.</h5>
                                </Col>
                                </Row>
                                </td>
                            </tr>  */}
                        </tbody>
                    </Table>
                </div>
        </React.Fragment>
    )
}

// <i className="fas fa-check-circle fa-2x white-icon mr-2"></i>
// <i className="fas fa-times-circle fa-2x white-icon mr-2"></i>
// <i className="fas fa-info-circle fa-2x white-icon"></i>
// <i className="fas fa-frown fa-2x"></i>
{/* <i className="fas fa-info-circle fa-2x white-icon"></i> */}




