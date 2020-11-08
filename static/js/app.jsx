const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App(){
    return (
        <div>
            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
                <Footer/>
            </Router>
        </div>
    )
}

function NavBar(){
    return (
        <div>
            <nav className="navbar navbar-expand-md fixed-top navbar-custom">
                <div className="container">
                    <Link to="/search" className="navbar-brand">Joyride</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <button className="btn navbar-btn shadow-none" data-toggle="modal" data-target="#login">Log In</button>
                        </li>
                        <li className="nav-item">
                        <button className="btn navbar-btn shadow-none" data-toggle="modal" data-target="#signup">Sign Up</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}


function Footer(){
    return (
        <footer className= "footer">
            <div className="container"> 
                {/* <!-- Copyright --> */}
                <div className="row">
                <div className="col-md-6">
                    <p id="app-name"> Joyride</p>
                    &copy; 2020 Tiffany Luu
                </div>
                <div className="col-md-3">
                    <p>
                    <i className="fas fa-envelope fa-2x mr-1" data-fa-transform="left-2 down-4"></i>
                    tiffanyell1@gmail.com
                    </p>
                    <p>
                    <i className="fab fa-linkedin fa-2x mr-2" data-fa-transform="down-3"></i>
                    <a href="https://www.linkedin.com/in/tiffany-luu-088b07143/" target="_blank">Click here</a>
                    </p>
                    <p><i className="fab fa-github fa-2x mr-1" data-fa-transform="down-3 left-2"></i>
                    <a href="https://github.com/telle1" target="_blank">Click here</a>
                    </p>
                </div>
                <div className="col-md-3">
                    <h3>About Us</h3>
                    <p>Joyride was created in November 2020 by <a href="https://www.linkedin.com/in/tiffany-luu-088b07143/" target="_blank">Tiffany Luu</a>, 
                    a student of Hackbright Academy, with the aim of increasing affordability for long-distance travel.
                    </p>
                </div>
                </div>  
            </div>  
        </footer>
    )
}

function HomePage(){
    return (
        <div>
            <Hero/>
            <InfoSquare/>
            <Features/>
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



function Search(){
    return (
        <div className="container search-container">
            <div className="row">
                <form action='/search-results' className="form-inline mx-auto" id="search-rides">
                    <input type="text" className="form-control mr-2" name="from_input" id = "from_input" placeholder="Start Location" required/>
                    <input type="text" className="form-control mr-2" name="to_input" id= "to_input" placeholder="Destination" required/>
                    <input type="date" className="form-control mr-2" name="date"/>
                    <button type="submit" className="btn btn-theme my-1">Search</button>
                </form>
            </div>
          <div id="msg" className="mt-3"></div>
          <div>TEST</div>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))
