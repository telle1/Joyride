function AboutMe(){

    useEffect(() => {
            AOS.init();
            AOS.refresh();        
    })
    return (
      <Container className="top-padding mb-5">
        <Row className="about-me-header mx-0" id="anchor-0">
            <h1 data-aos="flip-left" className="header-end">H</h1>
            <h1 data-aos="flip-right" data-aos-delay="100">E</h1>
            <h1 data-aos="flip-left" data-aos-delay="200">L</h1>
            <h1 data-aos="flip-right" data-aos-delay="300">L</h1>
            <h1 data-aos="flip-left" data-aos-delay="400">O</h1>
            <h1 data-aos="flip-right" data-aos-delay="500" className="header-space"></h1>
            <h1 data-aos="flip-left"  data-aos-delay="600" className="header-w">W</h1>
            <h1 data-aos="flip-right" data-aos-delay="700">O</h1>
            <h1 data-aos="flip-left" data-aos-delay="800">R</h1>
            <h1 data-aos="flip-right" data-aos-delay="900">L</h1>
            <h1 data-aos="flip-left" data-aos-delay="1000" className="header-end">D</h1>
        </Row>
        <Row className="mt-4">
            <Col xs={5} className="pr-0">
                <img src="../static/images/slice1.png" height="140" alt="panel-1" 
                    data-aos="flip-left" data-aos-delay="1100" className="panel-1"/>     
                <img src="../static/images/slice2.png" height="140" alt="panel-2"  width="130" 
                    data-aos="flip-left" data-aos-delay="1150"/>
                <img src="../static/images/slice3.png" height="140" alt="panel-3" width="130" 
                    data-aos="flip-left"  data-aos-delay="1200"/>
                <br/>
                <img src="../static/images/slice4.png" height="140" alt="panel-4"  
                    data-aos="flip-left" data-aos-delay="1300"/>
                <img src="../static/images/slice5.png" height="140" alt="panel-5" width="130"  
                    data-aos="flip-left" data-aos-delay="1350"/>
                <img src="../static/images/slice6.png" height="140" alt="panel-6" width="130" 
                    data-aos="flip-left" data-aos-delay="1400"/>
                    <br/>
                <img src="../static/images/slice7.png" height="140" width="130" alt="panel-7"  
                    data-aos="flip-left" data-aos-delay="1500"/>
                <img src="../static/images/slice8.png" height="140" width="130" alt="panel-8"  
                    data-aos="flip-left" data-aos-delay="1550"/>
                <img src="../static/images/slice9.png" height="140" width="130" alt="panel-9"  
                    data-aos="flip-left" data-aos-delay="1600"/>
                <br/>
                <h3 className="about-me-hi mt-3 text-secondary" data-aos="zoom-in" 
                    data-aos-delay="2600" data-aos-easing="ease-in-sine" data-aos-anchor="#anchor-0">
                    Looking for a developer who can learn quickly?
                </h3>
                <a href="https://www.linkedin.com/in/tiffany-luu0/" target="_blank" className="d-block" 
                    data-aos="zoom-in" data-aos-delay="2600" data-aos-easing="ease-in-sine" data-aos-anchor="#anchor-0">
                    Here is my LinkedIn: tiffany-luu0
                </a>
            </Col>
            <Col className="pl-0 ml-n3">
                <h1 className="about-me-hi" id="anchor" 
                data-aos="fade-up" data-aos-delay="1900">
                    Nice to meet you, I'm Tiffany
                </h1>
                <p className="text-justify about-me-par" data-aos="fade-up" data-aos-delay="1800">
                    A little bit about myself, I graduated from UCLA earlier this June &#40;Yay, go Bruins 
                    <span className="unitalic">🐻💛💙</span>&#41;. I majored in psychobiology 
                    and worked part-time at the UCLA Hub for Health Intervention, Policy, and Practice, 
                    in addition to a dental office, and did stem cell research at the medical school.
                </p>
                <p className="about-me-par text-justify" data-aos="fade-up" data-aos-delay="1700">
                    I was aspiring to enter the healthcare field, but after getting into the holy trinity
                    of web development that is Javascript, HTML, and CSS over the summer, I just could not 
                    let go. I am super passionate about art and design, so HTML and CSS appealed to me,
                    but I'm also a very logical person &#40;any other Logistician ISTJ's?&#41; and so the 
                    problem-solving aspect of Javascript drew me in. </p>
                <p className="about-me-par text-justify" data-aos="fade-down" data-aos-delay="1700">
                    And with that, I decided to take a leap of faith and enroll at Hackbright Academy, where
                    I was able to expand on my previous knowledge, solidify my understanding of core computer 
                    science topics such as data structures and algorithms, and learn new technologies such as 
                    React, Python, Flask, SQL, etc that I got to apply in this project! </p>
                <p className="about-me-par text-justify mb-0" data-aos="fade-down" data-aos-anchor="#anchor" data-aos-delay="1800">
                    Joyride was inspired by my time as a college student. I often had to travel from the Bay 
                Area to LA, sometimes on short notice, and I made use of my college's rideshare group on Facebook. 
                This was not the most reliable nor organized group, and so I decided to make a full-blown application 
                for rideshare with such features! I hope you enjoy the app, and enjoy the ride.</p>
                <h4 className="float-right about-me-hi" data-aos="fade-down" data-aos-anchor="#anchor" data-aos-delay="1900">
                    ♡ Tiffany Luu
                </h4>
            </Col>
        </Row>
        {/* Applying data-aos-anchor on the row does not work */}
        <Row className="about-me-header about-me-footer mx-0"> 
            <h1 data-aos="fade-up-left" data-aos-delay="2600" data-aos-anchor="#anchor" data-aos-placement="bottom bottom" className="header-end">T</h1>
            <h1 data-aos="fade-up-left" data-aos-delay="2550" data-aos-anchor="#anchor" data-aos-placement="bottom bottom" className="header-space">I</h1>
            <h1 data-aos="fade-up-left" data-aos-delay="2500" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">F</h1>
            <h1 data-aos="fade-up-left" data-aos-delay="2450" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">F</h1>
            <h1 data-aos="fade-up-left" data-aos-delay="2400" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">A</h1>
            <h1 data-aos="fade-up-left" data-aos-delay="2350" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">N</h1>
            <h1 data-aos="fade-up-right" data-aos-delay="2300" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">Y</h1>
            <h1 data-aos="fade-up-right" data-aos-delay="2250" data-aos-anchor="#anchor" data-aos-placement="bottom bottom" className="header-space">-</h1>
            <h1 data-aos="fade-up-right" data-aos-delay="2200" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">L</h1>
            <h1 data-aos="fade-up-right" data-aos-delay="2150" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">U</h1>
            <h1 data-aos="fade-up-right" data-aos-delay="2100" data-aos-anchor="#anchor" data-aos-placement="bottom bottom">U</h1>
            <h1 data-aos="fade-up-right" data-aos-delay="2000" data-aos-anchor="#anchor" data-aos-placement="bottom bottom" className="header-end">0</h1>

        </Row>
      </Container>
    )
  }

