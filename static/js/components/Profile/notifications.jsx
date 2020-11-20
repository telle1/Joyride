function Notifications({colSize}){
   
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

    let ridesNotPending = rides.filter(ride => ride.status !== 'Pending')
    console.log(ridesNotPending, 'RIDES NOT PENDING')
 
    return (
        <React.Fragment>
                <h3 className="yellow">Notifications</h3>
                <div className="notification-wrap">
                    <Table bordered>
                        <tbody>
                            {ridesNotPending.map(ride => <NotificationRow colSize={colSize} ride={ride}/>)}
                        </tbody>
                    </Table>
                </div>
        </React.Fragment>
    )
}

function NotificationRow({ride, colSize}){

    let iconBgColor;
    let icon;
    let textBgColor;
    let date = ride.req_date


    console.log('rIDE STATUSES', ride.status)

    if (ride.status === 'Approved'){
        iconBgColor = '#41AF41';
        icon = 'fas fa-check-circle fa-2x white-icon';
        textBgColor = '#EDF9ED';
    } else if (ride.status === 'Denied'){
        iconBgColor = '#FFAC00';
        icon = 'fas fa-times-circle fa-2x white-icon';
        textBgColor = '#FFFCF7';
    } else if (ride.status === 'Cancelled'){
        iconBgColor = '#3592FF';
        icon = 'fas fa-info-circle fa-2x white-icon';
        textBgColor = '#F3F9FF';
    } else { //ride status is Removed
        iconBgColor = '#D33634';
        icon = 'fas fa-frown fa-2x white-icon';
        textBgColor = '#FDF5F5';          
    }

    

    return (
        <tr>
            <td className="py-0"> 
                <Row>
                    <Col xs={colSize} className="d-flex justify-content-center align-items-center" style={{backgroundColor: iconBgColor}} >
                        <i className={`${icon}`}></i>
                    </Col>
                    <Col style={{backgroundColor: textBgColor}}>
                        <div className="d-inline float-right pt-2 text-muted"><sup>{date}</sup>
                        </div>
                        <h5 className="py-3 mb-0 gray-text">
                            <span style={{color: iconBgColor}}>{ride.status}</span>
                            <br/>
                            {ride.start_loc} to {ride.end_loc}
                        </h5>
                        <span>
                            
                        </span>
                        
                    </Col>
                </Row>
            </td>
        </tr>
    )
}




// <i className="fas fa-check-circle fa-2x white-icon mr-2"></i>
// <i className="fas fa-times-circle fa-2x white-icon mr-2"></i>
// <i className="fas fa-info-circle fa-2x white-icon"></i>
// <i className="fas fa-frown fa-2x"></i>
{/* <i className="fas fa-info-circle fa-2x white-icon"></i> */}
