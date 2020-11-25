const {InputGroup, FormControl} = ReactBootstrap


function Messages({match}){

        // const {user} = useContext(UserContext)

        const location = useLocation();
        const otherUserId = location.state.otherUserId 

        const [messages, setMessages] = useState([{sender: "", content:"", time:""}])
        // const [messages, setMessages] = useState([])
        const [message, setMessage] = useState("")

        const socket = io.connect('http://localhost:5000/')
        const socketRef = useRef();

        const fetchAllMessages = () => {
            fetch(`/messages/${match.params.convoId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    otherUserId: otherUserId
                }) 
            })
            .then(res => res.json())
            .then(data => {
                setMessages(data.msgs)
                console.log(messages, 'MESSAGE HISTORY')
            })
        }

        useEffect(() => {         

            fetchAllMessages();
            //CONNECT TO SOCKET
            socketRef.current = socket
            socket.on('connect', () => {
                //JOIN A ROOM
                socket.emit('join', {room: match.params.convoId})
            });
            //LISTEN FOR NEW MESSAGES AND UPDATE STATE
            socket.on('message', data => {
                console.log(data, 'SOCKET IO MESSAGE LINE 44');
                setMessages((messages) => [...messages, data])
                console.log('WHATS IN MNESSAGES AFTER SENDING A NEW ONE', messages)
            });
            //Need to get rid of the socket ref when the connection is closed
            return () => {
                socket.emit('leave', {room: match.params.convoId})
                socketRef.current.disconnect();
                console.log('TEST DISCONNECT/LEAVE ROOM? CLIENT')
              };

        }, [])
 
       const handleMessage = (e) => {
            e.preventDefault();
            //SEND MESSAGES
            let currentTime = new Date();
            socket.emit('message', {
                room: match.params.convoId,
                message: message,
                // sender: user
            })
            //CLEAR MESSAGE FIELD
            setMessage("")
            // fetchAllMessages(); // without this the individal message does not show?
       }
    
        return (
            <Container className="top-padding">
                <h4 className="yellow font-weight-bold">Chat with user name</h4>
                <div className="message-box">
                {messages.length > 0 ? 
                    (messages.map((singleMessage,i) => (
                        <div key={i}>
                            <MessageText key={i} singleMessage={singleMessage}/><br/></div>
                    )))
                    : null
                }
                </div>
                <br/>
                <form onSubmit={handleMessage}>
                <InputGroup>
                    <FormControl as="textarea"rows="1" name="message" value={message} 
                        onChange={(e)=> setMessage(e.target.value)}/>
                    <InputGroup.Append>
                        <button type="submit" className="btn" style={{backgroundColor: "#79C7C4", color:"white"}}>Send</button>
                    </InputGroup.Append>
                </InputGroup>
                </form>
            </Container>
        )
}

function MessageText({singleMessage}){

    const {user} = useContext(UserContext)
    // console.log(singleMessage, 'WHATS IN THE SINGLE MESAGE')
    return (
        <React.Fragment>
            <Row>
            <div className="col-md-3">
                {user == singleMessage.sender ? 
                    null
                    : 
                    <div>
                        <span className="other-user-message">{singleMessage.content}</span>    
                        <div className="small-text">{singleMessage.time}</div>
                    </div>
                }
            </div>
            <div className="col-md-3 offset-md-9">
                {user == singleMessage.sender ? 
                    <div>
                        <div className="user-message float-right">{singleMessage.content}</div>
                        <br/><br/>
                        <div className="float-right small-text">{singleMessage.time}</div>
                    </div> 
                    : 
                    null
                }
            </div>
            </Row>
        </React.Fragment>
    )
}


        // console.log('WHAT IS IN OTHER USER ID', otherUserId)
        // console.log('WHATS THE CONVO ID', match.params.convoId)

                    {/* {user == singleMessage.sender ? 
                <div className="d-inline-flex d-column justify-content-end yellow user-message">
                    {singleMessage.content}{singleMessage.time}
                </div> 
                : 
                <div className="d-inline-flex d-column">
                    {singleMessage.content}{singleMessage.time}
                </div>
            } */}