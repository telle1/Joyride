const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route} = ReactRouterDOM;

function App(){
    return (
        <div>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route path="/search">
                        <Search/>
                    </Route>
                    <Route path="/post">
                        <Post/>
                    </Route>
                    <Route exact path="/current-rides">
                        <CurrentRides/>
                    </Route> 
                    {/* <Route exact path="/past-rides">
                        <PastRides/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile/>
                    </Route>  */}
                </Switch>
                <Footer/>
            </Router>
        </div>

    )
}

ReactDOM.render(<App/>, document.getElementById('app'))
