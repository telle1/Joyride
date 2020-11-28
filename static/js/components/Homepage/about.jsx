function AboutMe(){

    useEffect(() => {
            AOS.init();
            AOS.refresh();        
    })
    return (
      <Container className="top-padding">
        <Row className="justify-content-md-center about-me-header">
            <h1 data-aos="flip-left" className="header-end mx-0">H</h1>
            <h1 data-aos="flip-right" data-aos-delay="100">E</h1>
            <h1 data-aos="flip-left" data-aos-delay="200">L</h1>
            <h1 data-aos="flip-right" data-aos-delay="300">L</h1>
            <h1 data-aos="flip-left" data-aos-delay="400">O</h1>
            <h1 data-aos="flip-right" data-aos-delay="500" className="header-space"></h1>
            <h1 data-aos="flip-left"  data-aos-delay="600" className="header-w">W</h1>
            <h1 data-aos="flip-right" data-aos-delay="700">O</h1>
            <h1 data-aos="flip-left" data-aos-delay="800">R</h1>
            <h1 data-aos="flip-right" data-aos-delay="900">L</h1>
            <h1 data-aos="flip-left" data-aos-delay="1000" className="test-ends">D</h1>
        </Row>
        <Row className="mt-4">
            <Col xs={5} className="pr-0">
                <img src="../static/images/panel-1.png" height="210" alt="panel-1" data-aos="flip-left" data-aos-delay="1100"/>
                <img src="../static/images/panel-2.png" height="210" alt="panel-2"  data-aos="flip-right" data-aos-delay="1200"/>
                <br/>
                <img src="../static/images/panel-3.png" height="210" alt="panel-3"  data-aos="flip-left"  data-aos-delay="1300"/>
                <img src="../static/images/panel-4.png" height="210" alt="panel-4"  data-aos="flip-right" data-aos-delay="1400"/>
            </Col>
            <Col className="pl-0 ml-n3">
  
            </Col>
        </Row>
      </Container>
    )
  }
  