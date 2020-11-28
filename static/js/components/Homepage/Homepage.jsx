// const { checkPropTypes } = require("prop-types"); //where did this come from
function HomePage(){

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [])

    return(
        <div>
            <Hero/>
            <InfoSquares/>
            <Features/>
            <HowItWorks/>
            <ControlledCarousel/>
            <Footer/>
        </div>
    )}

function Heading({header}){
  return(
    <Col>
       <h3 className="heading">{header}</h3>
       <div className="heading-underline"></div>
    </Col>
  )}
            
function Hero(){
    return (
        <section id="homesection">
           <h1 className="mr-1">Enjoy the <TypedText strings={['ride.', 'company.', 'savings.']} /> </h1>
        </section>
    )}

function TypedText({strings}){

  const typeRef = useRef("");
  const options = {
    strings: strings,
    typeSpeed: 70,
    backSpeed: 70,
    loop: true,
  };

  useEffect(() => {  
    const typed = new Typed(typeRef.current, options);
    return () => {
      typed.destroy();  
    };
  }, [])

  return (
    <span ref={typeRef}></span>
  );
};






function InfoSquares(){
  return (
      <section id="info-squares">
        <Container fluid>
          <Row>
            <InfoSquare key="left" dataAos="fade-up-right" imageClass="col-left" header="THE BEST LONG DISTANCE RIDESHARE." text="Join our welcoming community of carpoolers."/>
            <InfoSquare key="right" dataAos="fade-up-left" imageClass="col-right" header="FIND OR GIVE A RIDE." text="Search our user-friendly site for listings."/>
          </Row>   
        </Container>
      </section>   
  )}
  
function InfoSquare({imageClass, header, text, dataAos}){
  return (
    
      <Col xs={6} data-aos={dataAos} data-aos-duration="600" className="info-square">
        <div className={imageClass}>
            <div className="heading-underline"></div>
            <h3>{header}</h3>
            <h5>{text}</h5>
        </div>
      </Col>
  )}

function Features(){
  return (
    <section id = "why">
      <Container>
        <Heading header="Why Joyride?"/>
        <Row className= "text-center py-4">
          <Feature key="1" icon= "fas fa-piggy-bank fa-4x" dataAos="flip-left" header= 'Save Money' paragraph = "Less than an Uber or flight. It's not about finding savings at the pump,
              but finding savings before. Instead of paying for gas all by yourself, 
              split the cost with Joyride and make your wallet smile."/>
          <Feature key="2" icon= "fas fa-users fa-4x" dataAos="flip-up" header= 'Connect with Community' paragraph = "Meet new friends along the way. Our riders are always up for new
            adventures and road trips. Or take along family, friends, coworkers,
            teammates, and much more. What better way to enjoy the ride?"/>
          <Feature key="3" icon= "fas fa-globe-americas fa-4x" dataAos="flip-right" header= 'Help the Earth' paragraph = "Reduce your carbon footprint. Did you know that a whopping 28% of greenhouse
            gas emissions come from transportation? Help save the Earth and fight for
            climate change by riding with us."/>
        </Row>
      </Container>
    </section>
    
  )}

function Feature({icon, header, paragraph, dataAos}){
  return (
    <Col data-aos={dataAos} data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
      <div className="feature py-4">
        <i className={icon} style={{color: "#388087"}} data-fa-transform="shrink-3 up-4"></i>
        <h3>{header}</h3>
        <p className="text-justify"> {paragraph} </p>
      </div>
    </Col>
  )}

function HowItWorks(){


  // const howSteps = [
  //   {id: 1, icon: "fas fa-search fa-4x mr-4", description:["Simply" <span className="yellow font-weight-bold">check</span> "for rides travelling to your destination"]},
  //   {id: 2, icon: "fas fa-car fa-4x mr-4",  description: [<span className="yellow font-weight-bold">Match</span> "with a driver."]},
  //   {id: 3, icon: "far fa-handshake fa-4x mr-2", description:["<span className="yellow font-weight-bold">Negotiate</span> "on a great price."]},
  //   {id: 4, icon: "fas fa-flag-checkered fa-4x mr-4", description:["Happily <span className="yellow font-weight-bold">reach</span> your destination."]}
  // ]


  return (
    <section id = "how" data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-duration="1000">
      <Container>
        <Heading header="How It Works"/>
        <Row className="py-5 align-items-center">
          <Col className= "d-none d-md-block">
            <div className = "how-steps">
              <HowStep key={1} icon="fas fa-search fa-4x mr-4" description={["Simply ", <span className="yellow font-weight-bold">check</span>, " for rides travelling to your destination."]}/>
              <HowStep key={2} icon="fas fa-car fa-4x mr-4" description={[<span className="yellow font-weight-bold">Match</span>, " with a driver."]}/>
              <HowStep key={3} icon="far fa-handshake fa-4x mr-2" description={[<span className="yellow font-weight-bold">Negotiate</span>, " on a great price."]}/>
              <HowStep key={4} icon="fas fa-flag-checkered fa-4x mr-4" description={["Happily ", <span className="yellow font-weight-bold">reach</span>, " your destination."]}/>
              {/* {howSteps.map(howStep => 
                (<HowStep key={howSteps.id} icon={howSteps.icon} description={howSteps.description}/>)
              )} */}
            </div>
          </Col>
          <Col className= "vid">
            <iframe width="520" height="420" src="https://www.youtube.com/embed/V_lAhqLXT9A"
              style = {{border: "none", marginLeft: "30px"}}></iframe>
          </Col>
        </Row>
      </Container>
  </section>
  )}

function HowStep({icon, description}){
  return (
    <div className="d-flex align-items-center ml-5">
      <i className={icon} style={{color: "#eba92a"}} data-fa-transform="shrink-3 up-2"></i>
      <h4>{description}</h4>
    </div>
  )}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <section id = "carousel-slider" data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-duration="1000">
      <Heading header="Testimonials"/>
      <div className = "container">
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <div className="row">
                <TestimonialPerson imageSource='../static/images/testimonial_1.jpg' text="This is exactly the kind of app I was looking for as a fellow money-conscious traveller. 
                  I've met so many cool people along the way." name="User Name"/>
                <TestimonialPerson imageSource='../static/images/testimonial_2.jpg' text="Joyride has one of the best communities I'ev ever been apart of. All my rides
                have been extremely welcoming and on time." name="User Name"/>
                <TestimonialPerson imageSource='../static/images/testimonial_3.jpg' text="I've taken Joyride whenever I've needed to travel for work. I didn't see the point
                of paying for a flight when there's a service like this instead. I have absolutely loved my experience." name="User Name"/>
              </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="row">
              <TestimonialPerson imageSource='../static/images/testimonial_4.jpg' text="I started using this app a year ago and I absolutely love it! It's a super convenient way
                    to travel long distances while meeting new people and splitting the cost." name="User Name"/>
              <TestimonialPerson imageSource='../static/images/testimonial_5.jpg' text="I often travel to SF from LA almost every week. I used to take one of the buses that would
                    take almost 8 hours and was often poorly ventilated and very uncomfortabe. But then my friend introduced
                    me to Joyride and my life has since changed!" name="User Name"/>
              <TestimonialPerson imageSource='../static/images/testimonial_6.jpg' text="Joyride is literally the Uber equivalent for long distance rides. Its so convenient
                    and has really helped me save money while travelling. The team is very responsive and the
                    app is super user friendly as well!" name="User Name"/>
            </div>
            </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
}
  
function TestimonialPerson({imageSource, text, name}){
  return (
    <Col className= "text-center">
      <div className="profile">
        <img src={imageSource} alt="user"/>
        <blockquote>{text}</blockquote>
        <h3>{name}</h3>
      </div>
    </Col>
  )}



