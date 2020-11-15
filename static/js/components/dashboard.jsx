const {Container, Row, Col} = ReactBootstrap
const { useEffect, useState } = React
// const {FullCalendar} = FullCalendar
// const {dayGridPlugin} = FullCalendarDayGrid
// const {CountUp} = ReactCountUp

function Dashboard(){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [destinations, setDestinations] = useState(0)
    const [peopleMet, setPeopleMet] = useState(0)
    const [dollars, setDollars] = useState(0)

    useEffect(() =>{
        fetch("/dashboard", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setDestinations(data.destinations)
            setDollars(data.dollars_earned)
            setPeopleMet(data.people_met)
        })
    }, []);


    return(
        <Container>
            <div className="text-center text-header animated bounce dashboard-page mb-5">
                <h1>Where to next, <span>{firstName} {lastName}?</span></h1>
            </div>
            <Row>
                <StatSquare stat={destinations} description="destinations discovered." color="inner inner-0"/>
                <StatSquare stat={peopleMet} description="new adventurers met." color="inner inner-1"></StatSquare>
                <StatSquare stat={dollars} description="dollars helping the Earth." color="inner inner-2"></StatSquare>
                <StatSquare stat="100" description="percent pure JOY." color="inner inner-3"></StatSquare>
            </Row>
            <Row className="row mt-4">
                <Col>
                    {/* <div className="bio p-2">
                        <h4 className="text-center font-weight-bold travel-header">Travel List</h4>

                        <form action="/travel-list" id="travel-list" method="post">
                        <input type="text" name="travel-place"/>
                        <button type = "submit" className="btn btn-theme">Add</button>
                        </form>
                        <br/>

                        <ul id="places-to-go">
                            <li>test</li>
                        </ul>

                    </div> */}
                    {/* <TestCalendar/> */}
                    {/* <CountUp end={100}/> */}
                </Col>
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

        
// function TestCalendar(){
//     return (
//         <FullCalendar
//             plugins={[ dayGridPlugin ]}
//             initialView="dayGridMonth"
//             weekends={false}
//             events={[
//                 { title: 'event 1', date: '2019-04-01' },
//                 { title: 'event 2', date: '2019-04-02' }
//             ]}
//         />
//     )
// }