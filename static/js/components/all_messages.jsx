const {useState, useEffect} = React

function AllMessages(){

    const [conversations, setConversations] = useState([])

    const fetchUserMessages = () => {
        fetch('/all-messages')
        .then(res => res.json())
        .then(data => setConversations(data.conversations))
    }

    useEffect(() => {
        fetchUserMessages();
    }, [])

    return (
        <div className="top-padding">
            {conversations.length > 0 ? 
                conversations.map(conversation => (
                <p><Link to={`/messages/68`}> Name of the other person</Link></p>
            )) : null }

        </div>
    )
}