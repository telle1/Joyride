const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route} = ReactRouterDOM;
const { useState, useContext, createContext} = React 

const UserContext = createContext(null)


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
        <Router>
                <UserContext.Provider value={{user, alertStatus, alertColor, setUser, setAlertStatus, setAlertColor}}>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/">
                            {user ? <Redirect to={`/profile/${user}`}/> : <HomePage/>}
                        </Route>
                        <Route exact path="/home">
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
                        <Route path="/profile/:userId" render={(props) => <Profile {...props} user={user}/>}/>
                    </Switch>
                    <Footer/>
                </UserContext.Provider> 
        </Router>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))


