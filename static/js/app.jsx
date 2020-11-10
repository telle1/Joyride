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

    const [showAlert, setShowAlert] = useState(false)
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
                <NavBar setUser={setUser} user={user} setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
                {showAlert ? <UserAlert text={alertStatus} color={alertColor} setShowAlert={setShowAlert}/> : null}
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route path="/search">
                        <Search setAlertColor={setAlertColor} setAlertStatus={setAlertStatus} setShowAlert={setShowAlert}/>
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


