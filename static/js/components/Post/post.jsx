const { useState, useEffect } = React 
const {Form} = ReactBootstrap

function Post({setAlertStatus, setAlertColor, alertStatus, alertColor}){

    const [startInput, setStartInput] = useState('')
    const [endInput, setEndInput] = useState('')
    const [date, setDate] = useState('')
    const [seats, setSeats] = useState(null) //this is set to null instead of 0 due to it not overwriting the placeholder
    const [price, setPrice] = useState(null) //this is set to null instead of 0 due to the placeholder
    const [comments, setComments] = useState('')
    const [showAlert, setShowAlert] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/post-complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: startInput,
                to: endInput,
                date: date,
                seats: seats,
                price: price,
                comments: comments
            })
        })
        .then(res => res.json())
        .then(data => {
            setAlertStatus(data.msg)
            setAlertColor('success')
            setShowAlert(true)
        })
    }

    return(
    <React.Fragment>
        <div className="mt-3"> {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> 
            : null}
        </div>    
        <Container className="top-padding">
            <Row>
            <Col xs={5}>
                <Form onSubmit={handleSubmit} className="f-grey" method="post">
                    <h3 className="mb-3"> Post a Ride</h3>
                    <Form.Group as={Row} controlId="startingLocation">
                        <Form.Label column xs="3"> From </Form.Label>
                        <Col xs="9">
                            <SearchBar input={startInput} setInput={setStartInput} placeholder="Start Location"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="endLocation">
                        <Form.Label column xs="3"> To </Form.Label>
                        <Col xs="9">
                            <SearchBar input={endInput} setInput={setEndInput} placeholder="End Location"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="Date">
                        <Form.Label column xs="3"> Date </Form.Label>
                        <Col xs="9">
                            <input type="date" className="form-control" name="date" id="date" 
                            value={date} onChange={(e) => setDate(e.target.value)} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="seats">
                        <Form.Label column xs="3"> Seats </Form.Label>
                        <Col xs="9">
                            <input type="number" className="form-control" name="seats" placeholder="0"
                            min="0" value={seats || ""} onChange={(e) => setSeats(e.target.value)} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="price">
                        <Form.Label column xs="3"> Price </Form.Label>
                        <Col xs="9">
                            <input type="number" className="form-control" name="price" placeholder="0" min="0"
                            value={price || ""} onChange={(e) => setPrice(e.target.value)} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="comments">
                        <Form.Label column xs="3"> Comments </Form.Label>
                        <Col xs="9">
                            <textarea className="form-control" name="comments" rows="5" 
                            value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
                        </Col>
                    </Form.Group>
                    <Row>
                    <button type="submit" className="btn btn-theme ml-auto mr-3" id= "submit-button">Submit</button>
                    </Row>
                </Form>
            </Col>
            {/* <div className="col-md-7">
                <div id="map"></div>
            </div> */}
            </Row>
        </Container>
    </React.Fragment>
    )
}

