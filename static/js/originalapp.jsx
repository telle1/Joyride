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
            </Router>
        </div>
    )
}

function NavBar(){
    return (
        <div>
            {/* <nav>
                <ul>
                    <li>
                    <Link to="/">Homepage</Link>
                    </li>
                    <li>
                    <Link to="/search">Search</Link>
                    </li>
                </ul>
            </nav> */}

            <nav class="navbar navbar-expand-md fixed-top navbar-custom">
                <div class="container">
                    <Link to="/" className="navbar-brand">Joyride</Link>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <button class="btn navbar-btn shadow-none" data-toggle="modal" data-target="#login">Log In</button>
                        </li>
                        <li class="nav-item">
                        <button class="btn navbar-btn shadow-none" data-toggle="modal" data-target="#signup">Sign Up</button>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

function HomePage(){
    return (
        <div>
            <p>homepage</p>
        </div>
    )
}

function Search(){
    return (
        <div>
            <p>search</p>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))