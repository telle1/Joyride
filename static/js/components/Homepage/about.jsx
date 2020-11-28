function Test(){

    useEffect(() => {
            AOS.init();
            AOS.refresh();        
    })
    return (
      <Container className="top-padding">
        <Row className="test mx-0">
            <h1 data-aos="flip-left" className="about-me-header test-ends mx-0">H</h1>
            <h1 data-aos="flip-right" data-aos-delay="100" className="about-me-header">E</h1>
            <h1 data-aos="flip-left" data-aos-delay="200" className="about-me-header">L</h1>
            <h1 data-aos="flip-right" data-aos-delay="300" className="about-me-header">L</h1>
            <h1 data-aos="flip-left" data-aos-delay="400" className="about-me-header">O</h1>
            <h1 data-aos="flip-right" data-aos-delay="500" className="about-me-header test-smaller"></h1>
            <h1 data-aos="flip-left"  data-aos-delay="600" className="about-me-header test-bigger">W</h1>
            <h1 data-aos="flip-right" data-aos-delay="700" className="about-me-header">O</h1>
            <h1 data-aos="flip-left" data-aos-delay="800" className="about-me-header">R</h1>
            <h1 data-aos="flip-right" data-aos-delay="900" className="about-me-header">L</h1>
            <h1 data-aos="flip-left" data-aos-delay="1000" className="about-me-header test-ends">D</h1>
        </Row>
        <Row>
            <Col xs={5}>
                <img src="../static/images/panel-1.png" height="210" alt="panel-1" data-aos="flip-left" data-aos-delay="1100"/>
                <img src="../static/images/panel-2.png" height="210" alt="panel-2"  data-aos="flip-right" data-aos-delay="1200"/>
                <br/>
                <img src="../static/images/panel-3.png" height="210" alt="panel-3"  data-aos="flip-left"  data-aos-delay="1300"/>
                <img src="../static/images/panel-4.png" height="210" alt="panel-4"  data-aos="flip-right" data-aos-delay="1400"/>
            </Col>
            <Col>

            </Col>
        </Row>
      </Container>
    )
  }
  