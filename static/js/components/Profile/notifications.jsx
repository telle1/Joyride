function Notifications({colSize}){
   
    const [reqs, setReqs] = useState([])

    const fetchNotifications = () => {
        fetch('/notifications')
        .then(res => res.json())
        .then(data => {
            setReqs(data.notifications)
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
                            {reqs.map(req => <NotificationRow key={req.request_id} colSize={colSize} req={req}/>)}
                        </tbody>
                    </Table>
                </div>
        </React.Fragment>
    )
}

function NotificationRow({req, colSize}){

    let iconBgColor;
    let icon;
    let textBgColor;
    let date = req.req_date

    if (req.status === 'Approved'){
        iconBgColor = '#41AF41';
        icon = 'fas fa-check-circle fa-2x white-icon';
        textBgColor = '#EDF9ED';
    } else if (req.status === 'Denied'){
        iconBgColor = '#FFAC00';
        icon = 'fas fa-times-circle fa-2x white-icon';
        textBgColor = '#FFFCF7';
    } else if (req.status === 'Cancelled' || req.status === 'Cancelled By Passenger'){
        iconBgColor = '#3592FF';
        icon = 'fas fa-info-circle fa-2x white-icon';
        textBgColor = '#F3F9FF';
    } else { //req status is Removed
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
                        <span className="float-right pt-2 text-muted">
                        <sup>{<LocalTime date={date}/>}</sup>
                        </span>
                        <h5 className="py-3 mb-0 gray-text">
                            <span style={{color: iconBgColor}}>{req.status}</span>
                            <br/>
                            {req.start_loc} to {req.end_loc}
                        </h5>
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
