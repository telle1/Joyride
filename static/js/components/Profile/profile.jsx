const { useEffect, useState } = React
const {Container, Row, Col, Card} = ReactBootstrap

function Profile({match, user}){

    const [feedbacks, setFeedbacks] = useState([])
    const [profile, setProfile] = useState({location: "", title: "", image: ""})
    const [rating, setRating] = useState(0)
    const [userInfo, setUserInfo] = useState({})
    const [drivesCount, setDrivesCount] = useState(0)
    const [ridesCount, setRidesCount] = useState(0)

    const fetchUserProfile = () => {
        fetch(`/get-user-profile-info/${match.params.userId}`)
        .then(res => res.json())
        .then(data => {
            setFeedbacks(data.feedback)
            setProfile(data.profile_info)
            setUserInfo(data.user_info)
            setDrivesCount(data.drives_count)
            setRidesCount(data.rides_count)
            setRating(data.average_rating)
        })
    }

    useEffect(() =>{
        fetchUserProfile();
    }, [])

    return (
        <Container className="top-padding">
            <Row>
            {/* <CountUp end={100} /> */}
            <StatSquares match={match}/>
            <Col xs={4}>
                <UserCardInfo user={user} match={match} profile={profile} userInfo={userInfo}  
                fetchUserProfile={fetchUserProfile}/> 
                <UserCardStats drivesCount={drivesCount} ridesCount={ridesCount} rating={rating}/>
            </Col>
            <Col>
                {user == match.params.userId ? <Notifications colSize="1"/> : null }
                <FeedbackContainer feedbacks={feedbacks}/>
            </Col>
            </Row>
        </Container>
    )
}



function UserCardInfo({user, match, profile, userInfo, fetchUserProfile}){

    const [showEdit, setShowEdit] = useState(false)
    const handleEditShow = () => setShowEdit(true)
    const handleEditClose = () => setShowEdit(false) 

    return (
    <Card>
        <Card.Body>
            <React.Fragment>
                {user == match.params.userId ? 
                    <div><button className="btn-transparent float-right" onClick={handleEditShow}>Edit</button><br/><br/></div>
                    : null}
                <EditProfileModal showEdit={showEdit} handleEditClose={handleEditClose} user={user} 
                    profile={profile} fetchUserProfile={fetchUserProfile}/>
            </React.Fragment>
            <div className="d-flex flex-column align-items-center text-center">
                <UserBio imageSource={`../static/uploads/${profile.image}`} title={profile.title} userInfo={userInfo}/>
            </div>  
            <div>  
                <i className="fas fa-envelope fa-2x mr-3 ml-3 mb-2" data-fa-transform="left-2 down-5" style={{color: "#BEBEBE"}}/>
                <span>{userInfo.email}</span><br/>
                <i className="fas fa-phone fa-2x mr-3 ml-3 mb-2" data-fa-transform="left-2 down-5" style={{color: "#BEBEBE"}}/>
                <span>{userInfo.phone_num}</span> <br/>
                <i className="fas fa-map-pin fa-2x mr-4  ml-3 mb-2" data-fa-transform="down-5" style={{color: "#BEBEBE"}}/>
                <span>{profile.location}</span><br/>     
            </div>
        </Card.Body>  
    </Card>  
    )
}

function UserBio({imageSource, title, userInfo}){
    return (
        <React.Fragment>
            <img src={imageSource} alt="Profile picture" className="profile-image" width="170" height="170"/>
            <div className="mt-3">
                <h4>{userInfo.first_name} {userInfo.last_name}</h4>
                <p className="text-secondary mb-1">{title}</p>
            </div>
        </React.Fragment> 
    )
}

function UserCardStats({drivesCount, ridesCount, rating}){
    return (
        <React.Fragment>
            <Card className="btn-theme">
            <Row className="py-2">
                <Col className="text-center"> 
                    <h2>{drivesCount}</h2> DRIVES
                </Col>
                <Col className="text-center"><h2>{ridesCount}</h2> RIDES
                </Col>
                <Col className="text-center"><h2>{rating}</h2>STARS
                </Col>
            </Row>
            </Card>
        </React.Fragment>
    )
}


function EditProfileModal({showEdit, handleEditClose, user, fetchUserProfile, profile}){

    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")

    const setPreviousBio = () => {
        setTitle(profile.title)
        setLocation(profile.location)
    }

    useEffect(() => {
        setPreviousBio();
    }, [profile.title]) //lazy initializer

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('image', image);
        formData.append('profile_id', user);

        fetch('/edit-profile', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log('THIS IS THE DATA', data);
            fetchUserProfile();
        })
    }

    return (
        <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
        <Modal.Title> EDIT PROFILE </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
                <Form onSubmit={handleEdit} method="post">
                    <Form.Group as={Row} controlId="image">
                    <Form.Label column xs="3"> Image </Form.Label>
                        <Col xs={9}>
                            <input type="file" name="profile_image" accept="image/*" 
                            onChange={(e) => setImage(e.target.files[0])}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Form.Label column xs="3"> Title </Form.Label>
                        <Col xs={9}>
                            <input type="text" className="form-control" name="title" 
                            value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Col> 
                        {/* placeholder={title} */}
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Form.Label column xs="3"> Location</Form.Label>
                        <Col xs={9}>
                            <input type="text" className="form-control" name="location" 
                            value={location} onChange={(e) => setLocation(e.target.value)}/>
                        </Col> 
                        {/* placeholder={location}  */}
                    </Form.Group>
                    <button type="submit" className="btn btn-theme form-control" onClick={handleEditClose}>Save Changes</button>
                </Form>
        </Modal.Body>
    </Modal>
    )
}


    // let previousTitle = profile && profile.title ? profile.title : ""
    // let previousLocation = profile && profile.location ? profile.location : ""
    // let previousImage = profile && profile.image ? profile.image : ""

    // () => {
    //     let title = profile && profile.title ? profile.title : ""
    //     console.log('THIS IS TITLE INSIDE', title)
    //     console.log('THIS IS PRFOILE INSIDE', profile)
    //     return title
    // useEffect(() => {
    //     // setTitle(previousTitle) //when I tried to set this in the initial state, it did not work
    //     // setLocation(previousLocation) //when I tried to set this in the initial state, it did not work
    //     // // setImage(previousImage)
    // }, [])

    //useContext