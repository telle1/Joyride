const {Container, Row, Col} = ReactBootstrap
const { useEffect, useState } = React

function StatSquares({match}){


    const [destinations, setDestinations] = useState(0)
    const [peopleMet, setPeopleMet] = useState(0)
    const [dollars, setDollars] = useState(0)

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
                <StatSquare stat={destinations} description="destinations discovered." color="inner inner-0"/>
                <StatSquare stat={peopleMet} description="new adventurers met." color="inner inner-1"></StatSquare>
                <StatSquare stat={dollars} description="dollars earned." color="inner inner-2"></StatSquare>
                <StatSquare stat="100" description="percent pure JOY." color="inner inner-3"></StatSquare>
            </Row>
        </Container>
    )
}

function StatSquare({stat, description, color}){
    return (
        <Col className="stats">
            <div className={color}>
                <h1 className = "text-center count">{stat}</h1>
                <p className= "text-center">{description}</p>
            </div>
        </Col>
    )
}

        
