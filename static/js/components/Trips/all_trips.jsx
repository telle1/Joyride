const { useEffect } = React
const {Container, Tab, Tabs} = ReactBootstrap

//use for both current and past tables
function AllTrips(props){
    return(
        <Container className="top-padding">
            <Tabs defaultActiveKey="Driving" id="rides-table-comp">
                <Tab eventKey="Driving" title={props.firstTitle}>
                    {props.firstTab}
                </Tab>
                <Tab eventKey="Riding" title={props.secondTitle}>
                    {props.secondTab}
                </Tab>
            </Tabs>
        </Container>
    )    
}


