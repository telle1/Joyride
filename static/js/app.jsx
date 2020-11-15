const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route} = ReactRouterDOM;
const { useState } = React 
//useref

function UserAlert({text, setShowAlert, color}){
    return (
      <Alert className = "alert-position" variant={color} onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>{text}</Alert.Heading>
     </Alert>
    )
  }

function App(){

    const [user, setUser] = useState(null)
    const [alertColor, setAlertColor] = useState(false)
    const [alertStatus, setAlertStatus] = useState("")

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
                <NavBar setUser={setUser} user={user} alertColor={alertColor} setAlertColor={setAlertColor} alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                <Switch>
                    <Route exact path="/">
                        {/* <HomePage/> */}
                        {user ? <Redirect to="/dashboard"/> : <HomePage/>}
                    </Route>
                    <Route exact path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/search">
                        <Search alertColor={alertColor} setAlertColor={setAlertColor} alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                    </Route>
                    <Route path="/post">
                        <Post alertColor={alertColor} setAlertColor={setAlertColor} alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                    </Route>
                    <Route path="/current-rides">
                        <AllCurrentTrips alertColor={alertColor} setAlertColor={setAlertColor} alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                    </Route> 
                    <Route path="/past-rides">
                        <PastTrips user={user} alertColor={alertColor} setAlertColor={setAlertColor} alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                    </Route>
                    {/* <Route path="/profile/:profileId" component={Profile}/> */}
    <Route path="/profile/:profileId" render={(props) => <Profile {...props} user={user}/>}/>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route> 
                </Switch>
                <Footer/>
            </Router>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))


