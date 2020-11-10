const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route} = ReactRouterDOM;
const { useState } = React 


function App(){

    const [user, setUser] = useState(null)

    return (
        <div>
            <Router>
                <NavBar setUser={setUser} user={user}/>
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
                    <Route path="/current-rides">
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
