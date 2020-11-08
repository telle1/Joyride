const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;
// const useState = React.useState;
const { useState, useEffect } = React 

function HomePage(){

        // <div>
        //     {/* <LogInModal/> */}
        //     {/* <Hero/>
        //     <InfoSquare/>
        //     <Features/> */}

   const [count, setCount] = useState(0);
 
   return (
      <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>
           Click me
         </button>
      </div>
    );

  }
            
    

function Hero(){
    return (
        <section id="homesection">
           <h1>Enjoy the <span className="animate"></span></h1>
        </section>
    )
}

function InfoSquare(){
    return (
        <section id="what-row">
         <div className="container-fluid">
          <div className="row">
  
                <div className="col-md-6 what">
                <div className="col-left">
                    <div className="heading-underline"></div>
                    <h3>THE BEST LONG DISTANCE RIDESHARE.</h3>
                    <h5>Join our welcoming community of carpoolers.</h5>
                </div>
                </div>
                
            <div className="col-md-6 what">
              <div className = "col-right">
                <div className="heading-underline"></div>
                <h3>FIND OR GIVE A RIDE.</h3>
                <h5>Search our user-friendly site for listings.</h5>
              </div>
            </div> 
  
          </div>
        </div>
      </section>   
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
          <div className="col-md-4">
            <div className="feature py-4">
              <i
                className="fas fa-piggy-bank fa-4x"
                // style="color: #388087"
                data-fa-transform="shrink-3 up-4"
              ></i>
              <h3>Save Money</h3>
              <p className="text-justify">
                Less than an Uber or flight. It's not about finding savings at the pump,
                but finding savings before. Instead of paying for gas all by yourself, 
                split the cost with Joyride and make your wallet smile.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature py-4">
              <i
                className="fas fa-users fa-4x"
                // style="color: #388087"
                data-fa-transform="shrink-3 up-2"
              ></i>
         
              <h3>Connect with Community</h3>
              <p className="text-justify">
                Meet new friends along the way. Our riders are always up for new
                adventures and road trips. Or take along family, friends, coworkers,
                teammates, and much more. What better way to enjoy the ride?
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature py-4">
              <i
                className="fas fa-globe-americas fa-4x"
                // style="color: #388087"
                data-fa-transform="shrink-3 up-2"
              ></i>
              <h3>Help the Earth</h3>
              <p className="text-justify">
                Reduce your carbon footprint. Did you know that a whopping 28% of greenhouse
                gas emissions come from transportation? Help save the Earth and fight for
                climate change by riding with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
)
}


function LogInModal(){
  return (
    <div className="modal fade" id="login">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title w-100 text-center">USER LOGIN</h2>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form action="/process-login" method="post">
              <div className="input-group input-group-lg mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Email" name="email" required/>
              </div>
              <div className="input-group input-group-lg mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
                </div>
                <input type="password" className="form-control" placeholder="Password" name="password" required/>
              </div>     
              <div className="form-group mb-4">
                <button type="submit" className="btn btn-theme form-control">Login</button> 
              </div>  
            </form>
          </div>
          <div className="modal-footer">
            <p className = "w-100 text-center">Not a member? Sign up <a href="#" data-toggle="modal" data-target="#signup">here</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}