const {useState, useEffect} = React

function AllMessages(){

    const [conversations, setConversations] = useState([{convo_id: '', other_user: ''}])

    const fetchUserMessages = () => {
        fetch('/all-messages')
        .then(res => res.json())
        .then(data => setConversations(data.conversation_ids))
    }

    useEffect(() => {
        fetchUserMessages();
    }, [])

    console.log(conversations)

    return (
        <Container>
        <div className="top-padding">
            <h3 className="yellow">All Conversations</h3>
            {conversations.length > 0 ? 
                conversations.map(conversation => (
                <p><Link to={{ pathname: `/messages/${conversation.convo_id}`, state:{otherUserId: conversation.other_user} }}> OTHER USER ID {conversation.other_user} </Link></p>
            )) : null }

        </div>
        </Container>
    )
}