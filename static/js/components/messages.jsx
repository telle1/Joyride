function Messages({match}){

        console.log('WHATS THE CONVO ID', match.params.convoId)
        console.log('WHT IS IN MATCH', match)
        const [messages, setMessages] = useState([])
        const [message, setMessage] = useState("")

        const socket = io.connect('http://localhost:5000/')
        const socketRef = useRef();

        console.log(messages, 'MESSAGE HISTORY')

        useEffect(() => {         
            fetch(`/messages/${match.params.convoId}`)
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
                <h5>test chat log</h5>
                {/* {messages.map((message,i) => (
                   <p key={i}>{message}</p> 
                ))} */}
                {messages.length > 0 ? 
                    messages.map((message,i) => (
                   <p key={i}>{message}</p> 
                )) : null }
                <form onSubmit={handleMessage}>
                    <textarea name="message" value={message} 
                    onChange={(e)=> setMessage(e.target.value)}></textarea>
                    <button type="submit" className="btn btn-theme">Message</button>
                </form>
            </Container>
        )

}