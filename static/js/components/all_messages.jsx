function AllMessages(){

    const [conversations, setConversations] = useState([{convo_id: '', other_user: '', other_user_name: ""}])

    const fetchConversations = () => {
        fetch('/all-messages')
        .then(res => res.json())
        .then(data => setConversations(data.conversation_ids))
    }

    useEffect(() => {
        fetchConversations();
    }, [])

    console.log(conversations)

    return (
        <Container>
        <div className="top-padding">
            <h3 className="yellow">All Conversations</h3>
            {conversations.length > 0 ? 
                conversations.map(conversation => (
                <p>
                    <Link to={{ pathname: `/messages/${conversation.convo_id}`, 
                    state:{otherUserId: conversation.other_user,
                        otherUserName: [conversation.other_user_name[0], conversation.other_user_name[1]]
                    } }}> 
                        {conversation.other_user_name[0]} {conversation.other_user_name[1]} 
                    </Link>
                </p>
            )) 
            : null }
        </div>
        </Container>
    )
}