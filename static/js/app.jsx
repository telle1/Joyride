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
            <nav>
                <ul>
                    <li>
                    <Link to="/">Homepage</Link>
                    </li>
                    <li>
                    <Link to="/search">Search</Link>
                    </li>
                </ul>
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