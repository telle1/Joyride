const { useEffect, useState } = React
const {Container, Row, Col} = ReactBootstrap


function Profile(){

    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() =>{
        fetch("/get-user-feedback", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setFeedbacks(data.feedback)
        })
    }, [])
    
    return (
        <Container className="profile-page">
            <Row>
            <Col xs={4}>
            <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="test" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                </div>
              </div>  
            </div>  
            </Col>
            <Col>
                <h3 className="yellow">Recent Feedback</h3>
                <div className="table-wrap">
                    <table className="table table-bordered table-striped">
                    <tbody>
                        <FeedbackRow feedbacks={feedbacks}/>
                    </tbody>
                    </table>
                </div>
            </Col>
            </Row>
        </Container>
    )
}

function FeedbackRow({feedbacks}){
    return (
        <React.Fragment>    
        {feedbacks.map(feedback => 
        <tr>
            <td>{feedback.feedback}<br/>
                {feedback.rating}
            </td>
        </tr>)}
        </React.Fragment>
    )
}