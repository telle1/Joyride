function Messages(){

        const [messages, setMessages] = useState([])
        const [message, setMessage] = useState("")

        const socket = io.connect('http://localhost:5000/')
        const socketRef = useRef();

        useEffect(() => {

         
            fetch('/messages')
            .then(res => res.json())
            .then(data => {
                setMessages(data.msgs.content)
            })

            //CONNECT TO SOCKET
            socketRef.current = socket
            socket.on('connect', () => {
                //JOIN A ROOM
                socket.emit('join', {room: 1})
            });
            //LISTEN FOR NEW MESSAGES AND UPDATE STATE
            socket.on('message', data => {
                console.log(data, 'SOCKET IO MESSAGE');
                setMessages((messages) => [...messages, data])
            });
            //Need to get rid of the socket ref when the connection is closed
            return () => {
                socket.emit('leave', {room: 1})
                socketRef.current.disconnect();
                console.log('TEST DISCONNECT/LEAVE ROOM? CLIENT')
              };

        }, [])
                
       const handleMessage = (e) => {
            e.preventDefault();
            //SEND MESSAGES
            socket.emit('message', {
                room: 1,
                message: message
            })
       }
    
        return (
            <Container className="top-padding">
                <h5>test chat log</h5>
                {messages.map((message,i) => (
                   <p key={i}>{message}</p> 
                ))}
                <form onSubmit={handleMessage}>
                    <textarea name="message" value={message} 
                    onChange={(e)=> setMessage(e.target.value)}></textarea>
                    <button type="submit" className="btn btn-theme">Message</button>
                </form>
            </Container>
        )

}