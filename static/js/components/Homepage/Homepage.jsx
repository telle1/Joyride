// const { checkPropTypes } = require("prop-types"); //where did this come from
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;
const {Carousel, Container, Row, Col} = ReactBootstrap
// const {Typed} = Typed.JS

function HomePage(){
    return(
        <div>
            <Hero/>
            <InfoSquares/>
            <Features/>
            <HowItWorks/>
            <ControlledCarousel/>
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
           {/* <h1>Enjoy the</h1>  */}
           {/* <Typeanimation/> */}
           <h1>Enjoy the <span className="animate">ride</span></h1>
        </section>
    )}


// const Typeanimation = () => {

//   useEffect(() => {
//       // Options for the Typed object
//       const options = {
//           strings: [ride, company, savings],
//           typeSpeed: 50
//       };

//       // New Typed instance
//       const typed = new Typed('#typed_effect', options);

//       // Destroy Typed instance on unmounting the component to prevent memory leaks
//       return () => {
//           typed.destroy();
//       };
//   }, [text]);

//   return (    
//       <span id='typed_effect'></span>
//   );
// };

function InfoSquares(){
  return (
      <section id="info-squares">
        <Container fluid>
          <Row>
            <InfoSquare imageClass="col-left" header="THE BEST LONG DISTANCE RIDESHARE." text="Join our welcoming community of carpoolers."/>
            <InfoSquare imageClass="col-right" header="FIND OR GIVE A RIDE." text="Search our user-friendly site for listings."/>
          </Row>
        </Container>
      </section>   
  )}
  
function InfoSquare({imageClass, header, text}){
  return (
      <Col className="info-square">
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
          <Feature icon= "fas fa-piggy-bank fa-4x" header= 'Save Money' paragraph = "Less than an Uber or flight. It's not about finding savings at the pump,
              but finding savings before. Instead of paying for gas all by yourself, 
              split the cost with Joyride and make your wallet smile."/>
          <Feature icon= "fas fa-users fa-4x" header= 'Connect with Community' paragraph = "Meet new friends along the way. Our riders are always up for new
            adventures and road trips. Or take along family, friends, coworkers,
            teammates, and much more. What better way to enjoy the ride?"/>
          <Feature icon= "fas fa-globe-americas fa-4x" header= 'Help the Earth' paragraph = "Reduce your carbon footprint. Did you know that a whopping 28% of greenhouse
            gas emissions come from transportation? Help save the Earth and fight for
            climate change by riding with us."/>
        </Row>
      </Container>
    </section>
  )}

function Feature({icon, header, paragraph}){
  return (
    <Col>
      <div className="feature py-4">
        <i className={icon} style={{color: "#388087"}} data-fa-transform="shrink-3 up-4"></i>
        <h3>{header}</h3>
        <p className="text-justify"> {paragraph} </p>
      </div>
    </Col>
  )}

function HowItWorks(){
  return (
    <section id = "how">
      <Container>
        <Heading header="How It Works"/>
        <Row className="py-5 align-items-center">
          <Col className= "d-none d-md-block">
            <div className = "how-steps">
              <HowStep key="search" icon="fas fa-search fa-4x mr-4" description={["Simply ", <span>check</span>, " for rides travelling to your destination."]}/>
              <HowStep key="match" icon="fas fa-car fa-4x mr-4" description={[<span>Match</span>, " with a driver."]}/>
              <HowStep key="negotiate" icon="far fa-handshake fa-4x mr-2" description={[<span>Negotiate</span>, " on a great price."]}/>
              <HowStep ket="reach" icon="fas fa-flag-checkered fa-4x mr-4" description={["Happily ", <span>reach</span>, " your destination."]}/>
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
    <div className = "how-step">
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
    <section id = "carousel-slider">
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

