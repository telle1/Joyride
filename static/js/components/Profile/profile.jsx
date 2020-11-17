const { useEffect, useState } = React
const {Container, Row, Col, Card} = ReactBootstrap
const {SettingsIcon, SvgIcon} = MaterialUI


function Profile({match, user}){

    const [feedbacks, setFeedbacks] = useState([])
    const [profile, setProfile] = useState(null)
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
        console.log(match)
        fetchUserProfile();
    }, [])

    console.log('USER PROFILE INFO', profile)
    
    return (
        <Container className="top-padding">
            <Row>
            <Dashboard match={match}/>
            <Col xs={4}>
                <UserInfo user={user} match={match} profile={profile} userInfo={userInfo}  
                drivesCount={drivesCount} ridesCount={ridesCount} rating={rating} fetchUserProfile={fetchUserProfile}/> 
                <UserStats drivesCount={drivesCount} ridesCount={ridesCount} rating={rating}/>
            </Col>
            
            <Col>
                <FeedbackContainer feedbacks={feedbacks}/>
            </Col>
            </Row>
        </Container>
    )
}


function UserStats({drivesCount, ridesCount, rating}){
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

function UserInfo({user, match, profile, userInfo, drivesCount, ridesCount, rating, fetchUserProfile}){

    const [showEdit, setShowEdit] = useState(false)
    const handleEditShow = () => setShowEdit(true)
    const handleEditClose = () => setShowEdit(false) 

    console.log('THIS IS THE USER', user)
    console.log('THIS IS THE PROFILE ID', match.params.userId)

    return (
    <Card>
        <Card.Body>
            <React.Fragment>
                {user == match.params.userId ? <div><button className="btn-transparent float-right" onClick={handleEditShow}>Edit</button><br/><br/></div>
                : null}
                <EditProfileModal showEdit={showEdit} handleEditClose={handleEditClose} user={user} 
                profile={profile} fetchUserProfile={fetchUserProfile}/>
            </React.Fragment>
            <div className="d-flex flex-column align-items-center text-center">
                {profile ? <UserBio imageSource={`../static/uploads/${profile.image}`} title={profile.title} location={profile.location} userInfo={userInfo}/>
                    : <UserBio imageSource={'../static/images/user.jpg'} title={""} location={""} userInfo={userInfo}/>}
            </div>  
            <div>  
                <i className="fas fa-envelope fa-2x mr-3 ml-3 mb-2" data-fa-transform="left-2 down-5" style={{color: "#BEBEBE"}}/>
                <span>{userInfo.email}</span><br/>
                <i className="fas fa-phone fa-2x mr-3 ml-3 mb-2" data-fa-transform="left-2 down-5" style={{color: "#BEBEBE"}}/>
                <span>{userInfo.phone_num}</span> <br/>
                <i className="fas fa-map-pin fa-2x mr-4  ml-3 mb-2" data-fa-transform="down-5" style={{color: "#BEBEBE"}}/>
                <span>Enter Location Here</span><br/>
                
            </div>
        </Card.Body>  
    </Card>  
    )
}

function UserBio({imageSource, title, location, userInfo}){
    return (
        <React.Fragment>
            <img src={imageSource} alt="Profile picture" className="profile-image" width="170" height="170"/>
            <div className="mt-3">
                <h4>{userInfo.first_name} {userInfo.last_name}</h4>
                <p className="text-secondary mb-1">{title}</p>
                {/* <p className="text-muted font-size-sm">{location}</p> */}
            </div>
        </React.Fragment> 
    )
}



function EditProfileModal({showEdit, handleEditClose, user, profile, fetchUserProfile}){

    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")

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
            fetchUserProfile();
        })
    }

    return (
        <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
        <Modal.Title>EDIT PROFILE </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
                <form onSubmit={handleEdit} method="post">
                <div className = "form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Image</label>
                    </div>
                    <div className="col-sm-9">
                        <input type="file" name="profile_image" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Title</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label htmlFor="#">Location</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" name="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                    </div> 
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-theme form-control" onClick={handleEditClose}>Save Changes</button>
                </div>
                </form>
        </Modal.Body>
    </Modal>
    )
}

