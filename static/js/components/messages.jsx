const {InputGroup, FormControl} = ReactBootstrap


function Messages({match}){

        const location = useLocation();
        const otherUserId = location.state.otherUserId

        console.log('WHAT IS IN OTHER USER ID', otherUserId)
        console.log('WHATS THE CONVO ID', match.params.convoId)
        
        const [messages, setMessages] = useState([])
        const [message, setMessage] = useState("")

        const socket = io.connect('http://localhost:5000/')
        const socketRef = useRef();

        console.log(messages, 'MESSAGE HISTORY')

        useEffect(() => {         
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

            //CONNECT TO SOCKET
            socketRef.current = socket
            socket.on('connect', () => {
                //JOIN A ROOM
                socket.emit('join', {room: match.params.convoId})
            });
            //LISTEN FOR NEW MESSAGES AND UPDATE STATE
            socket.on('message', data => {
                console.log(data, 'SOCKET IO MESSAGE');
                setMessages((messages) => [...messages, data])
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
            socket.emit('message', {
                room: match.params.convoId,
                message: message
            })
            //CLEAR MESSAGE FIELD
            setMessage("")
       }
    
        return (
            <Container className="top-padding">
                <div className="message-box">
                {messages.length > 0 ? 
                    messages.map((singleMessage,i) => (
                        <div key={i} className="d-flex d-column"><MessageText key={i} singleMessage={singleMessage}/><br/></div>)) 
                        : null
                }
                </div>
                <br/>
                <form onSubmit={handleMessage}>
                <InputGroup>
                    <FormControl as="textarea"rows="1" name="message" value={message} 
                        onChange={(e)=> setMessage(e.target.value)}/>
                    <InputGroup.Append>
                        <button type="submit" className="btn btn-theme">Send</button>
                    </InputGroup.Append>
                </InputGroup>
                </form>
            </Container>
        )
}

function MessageText({singleMessage}){

    const {user} = useContext(UserContext)

    return (
        <React.Fragment>
            {/* {user == message.sender ? <div className="float-right yellow">{message.content}</div> : 
                <React.Fragment><div>{message.content}</div></React.Fragment>} */}
            {singleMessage}
        </React.Fragment>
    )
}