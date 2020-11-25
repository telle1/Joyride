const { Container, Row, Col } = ReactBootstrap
const { useEffect, useState } = React

function StatSquares({match, user}){

    const [destinations, setDestinations] = useState(0)
    const [peopleMet, setPeopleMet] = useState(0)
    const [dollars, setDollars] = useState(0)

    const statSquares = [
        {id:1, stat: destinations, description: "destinations discovered", color:"inner inner-0"},
        {id:2, stat: peopleMet, description: "new adventurers met.", color:"inner inner-1"},
        {id:3, stat: dollars, description: "dollars earned.", color:"inner inner-2"},
        {id:4, stat: "100", description: "percent pure JOY.", color:"inner inner-3"}
    ]

    useEffect(() =>{
        fetch(`/dashboard/${match.params.userId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDestinations(data.destinations)
            setDollars(data.dollars_earned)
            setPeopleMet(data.people_met)
        })
    }, []);


    return(
        <Container className="mb-4">
            <Row>
                {statSquares.map(statSquare => 
                    (<StatSquare key={statSquare.id} stat={statSquare.stat} 
                        description={statSquare.description} color={statSquare.color}
                        match={match} user={user}/>)
                )}
            </Row>
        </Container>
    )
}

function StatSquare({stat, description, color, match, user}){
    
    return (
        <Col className="stats">
            <div className={color}>
                <h1 className = "text-center count">
                    {user == match.params.userId ? <NumberCounter key={stat} stat={stat}/> : stat}
                </h1>
                <p className= "text-center">{description}</p>
            </div>
        </Col>
    )
}


function NumberCounter({stat}){

    let animationLength = 2000 //in milliseconds
    let acceleration = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
    let frameLength= 24; //in milliseconds
    let end = stat;

	const [ count, setCount ] = useState(0);

	useEffect(() => {
		let start = 0;
		const totalFrames = Math.round(animationLength/frameLength); 
            const counter = setInterval(() => {
                start++;
                const countUp = acceleration(start/totalFrames);
                setCount(end * countUp);

                if (start === totalFrames){
                    clearInterval(counter);
                }
            }, frameLength);
	}, [stat]);

	return Math.floor(count);
};



