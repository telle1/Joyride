function Notifications(){
    return (
        <React.Fragment>
                <h3 className="yellow">Notifications</h3>
                <div className="notification-wrap">
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td className="py-0"> 
                                <Row>
                                <Col xs={1} className="dark-blue d-flex justify-content-center align-items-center">
                                <i className="fas fa-info-circle fa-2x white-icon"></i>
                                </Col>
                                <Col className="blue">
                                    <div className="d-inline float-right pt-2 text-muted"><sup>November 18, 2020</sup>
                                    </div>
                                    <h5 className="py-3 mb-0 black">Request for SF to LA has been approved.</h5>
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
                            </tr>
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



function NotificationRow(){
    return (
        <tr>
            <td className="py-0"> 
                <Row>
                    <Col xs={1} className="dark-blue d-flex justify-content-center align-items-center">
                        <i className="fas fa-info-circle fa-2x white-icon"></i>
                    </Col>
                    <Col className="blue">
                        <div className="d-inline float-right pt-2 text-muted"><sup>November 18, 2020</sup>
                        </div>
                        <h5 className="py-3 mb-0 gray-text">Request for SF to LA has been approved.</h5>
                    </Col>
                </Row>
            </td>
        </tr>
    )
}