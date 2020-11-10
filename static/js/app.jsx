const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route} = ReactRouterDOM;
const { useState } = React 
//useref

function App(){

    const [user, setUser] = useState(null)
    //save user on page refresh
    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
          const saveUser = JSON.parse(user_id);
          setUser(saveUser);
        }
      }, []);

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
                        <AllCurrentTrips/>
                    </Route> 
                    <Route path="/past-rides">
                        <PastTrips/>
                    </Route>
                   <Route path="/profile">
                        <Profile/>
                    </Route> 
                </Switch>
                <Footer/>
            </Router>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))
