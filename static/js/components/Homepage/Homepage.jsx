const { checkPropTypes } = require("prop-types");

const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;
// const useState = React.useState;
const { useState, useEffect } = React 

function HomePage(){
    return(
        <div>
            <Hero/>
            <InfoSquares/>
            <Features/>
            <HowItWorks/>
        </div>
    )
}
            
function Hero(){
    return (
        <section id="homesection">
           <h1>Enjoy the <span className="animate"></span></h1>
        </section>
    )
}

function InfoSquares(){
  return (
      <section id="what-row">
        <div className="container-fluid">
          <div className="row">
            <InfoSquare imageClass="col-left" header="THE BEST LONG DISTANCE RIDESHARE." text="Join our welcoming community of carpoolers."/>
            <InfoSquare imageClass="col-right" header="FIND OR GIVE A RIDE." text="Search our user-friendly site for listings."/>
          </div>
        </div>
      </section>   
  )
}
  
function InfoSquare({imageClass, header, text}){
  return (
      <div className="col-md-6 what">
        <div className={imageClass}>
            <div className="heading-underline"></div>
            <h3>{header}</h3>
            <h5>{text}</h5>
        </div>
      </div>
  )
}


function Features(){
    return (
        <section id = "why">
          <div className="container">
            <div className="col-12">
              <h3 className="heading">Why Joyride?</h3>
              <div className="heading-underline"></div>
            </div>
            <div className="row text-center py-4">
              <Feature icon= "fas fa-piggy-bank fa-4x" header= 'Save Money' paragraph = "Less than an Uber or flight. It's not about finding savings at the pump,
                  but finding savings before. Instead of paying for gas all by yourself, 
                  split the cost with Joyride and make your wallet smile."/>
              <Feature icon= "fas fa-users fa-4x" header= 'Connect with Community' paragraph = "Meet new friends along the way. Our riders are always up for new
                adventures and road trips. Or take along family, friends, coworkers,
                teammates, and much more. What better way to enjoy the ride?"/>
              <Feature icon= "fas fa-globe-americas fa-4x" header= 'Help the Earth' paragraph = "Reduce your carbon footprint. Did you know that a whopping 28% of greenhouse
                gas emissions come from transportation? Help save the Earth and fight for
                climate change by riding with us."/>
            </div>
          </div>
        </section>
)
}

function Feature({icon, header, paragraph}){
  return (
          <div className="col-md-4">
            <div className="feature py-4">
              <i
                className={icon}
                style={{color: "#388087"}}
                data-fa-transform="shrink-3 up-4"
              ></i>
              <h3>{header}</h3>
              <p className="text-justify">
                {paragraph}
              </p>
            </div>
          </div>
  )
}

function HowItWorks(){
  return (
    <section id = "how">
      <div className = "container">
        <div className="col-12">
          <h3 className="heading">How It Works</h3>
          <div className="heading-underline"></div>
        </div>
        <div className = "row py-5 align-items-center">
          <div className = "col-md-6 d-none d-md-block">
            <div className = "how-steps">
              <HowStep icon="fas fa-search fa-4x mr-4" description={["Simply ", <span>check</span>, " for rides travelling to your destination."]}/>
              <HowStep icon="fas fa-car fa-4x mr-4" description={[<span>Match</span>, " with a driver."]}/>
              <HowStep icon="fas fa-search fa-4x mr-4" description={[<span>Negotiate</span>, " on a great price."]}/>
              <HowStep icon="fas fa-search fa-4x mr-4" description={["Happily ", <span>reach</span>, " your destination."]}/>
            </div>
          </div>
          <div className = "col-md-6 vid">
            <iframe
              width="520"
              height="420"
              src="https://www.youtube.com/embed/V_lAhqLXT9A"
              style = {{border: "none", marginLeft: "30px"}}></iframe>
           
          </div>
        </div>
    </div>
  </section>
)
}

function HowStep({icon, description}){
  return (
    <div className = "how-step">
      <i
      className={icon}
      style={{color: "#eba92a"}}
      data-fa-transform="shrink-3 up-2"
      ></i>
      <h4>{description}</h4>
    </div>
  )
}

  {/* <div class = "how-step">
              <i
              class="fas fa-search fa-4x mr-4"
              style="color: #eba92a"
              data-fa-transform="shrink-3 up-2"
              ></i>
              <h4>Simply <span>check</span> for rides travelling to your destination.</h4>
          </div>

          <div class = "how-step">
              <i
              class="fas fa-car fa-4x mr-4"
              style="color: #eba92a"
              data-fa-transform="shrink-3 up-2"
              ></i>
              <h4><span>Match</span> with a driver.</h4>
          </div>

          <div class = "how-step">
              <i
              class="far fa-handshake fa-4x mr-2 "
              style="color: #eba92a"
              data-fa-transform="shrink-3 up-2 left-2"
              ></i>
              <h4><span>Negotiate</span> on a great price.</h4>
          </div>

          <div class = "how-step">
              <i
              class="fas fa-flag-checkered fa-4x mr-4"
              style="color: #eba92a"
              data-fa-transform="shrink-3 up-2"
              ></i>
              <h4>Happily <span>reach</span> your destination.</h4>
          </div> */}