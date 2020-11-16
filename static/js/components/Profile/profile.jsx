const { useEffect, useState } = React
const {Container, Row, Col, Card} = ReactBootstrap
const {SettingsIcon, SvgIcon} = MaterialUI


function Profile({match, user}){

    const [feedbacks, setFeedbacks] = useState([])
    const [profile, setProfile] = useState(null)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() =>{
        console.log(match)
        fetch(`/get-user-profile-info/${match.params.profileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            setFeedbacks(data.feedback)
            setProfile(data.profile_info)
            setUserInfo(data.user_info)
            console.log('USER PROFILE INFO', profile)
        })
    }, [])
    
    return (
        <Container className="top-padding">
            <Row>
            <Col xs={4}>
                <UserInfo user={user} match={match} profile={profile} userInfo={userInfo}/> 
            </Col>
            <Col>
                <FeedbackContainer feedbacks={feedbacks}/>
            </Col>
            </Row>
        </Container>
    )
}

function UserInfo({user, match, profile, userInfo}){

    const [showEdit, setShowEdit] = useState(false)
    const handleEditShow = () => setShowEdit(true)
    const handleEditClose = () => setShowEdit(false) 

    console.log('THIS IS THE USER', user)
    console.log('THIS IS THE PROFILE ID', match.params.profileId)

    return (
    <Card>
        <Card.Body>
            <React.Fragment>
                {user == match.params.profileId ? <div><button className="btn-transparent float-right" onClick={handleEditShow}>Edit</button><br/><br/></div>
                : null}
                <EditProfileModal showEdit={showEdit} handleEditClose={handleEditClose} user={user} profile={profile}/>
            </React.Fragment>
            <div className="d-flex flex-column align-items-center text-center">
                {profile ? <UserStats imageSource={profile.image} title={profile.title} location={profile.location} userInfo={userInfo}/>
                    : <UserStats imageSource={'../static/images/user.jpg'} title={""} location={""} userInfo={userInfo}/>}
                Email: {userInfo.email} <br/>
                Phone Number: {userInfo.phone_num}
                {user == match.params.profileId ? null : <button className="btn btn-yellow">Follow</button>} 


            </div>
        </Card.Body>  
    </Card>  
    )
}

function UserStats({imageSource, title, location, userInfo}){
    return (
        <React.Fragment>
            <img src={imageSource} alt="Profile picture" className="profile-image" width="150" height="150"/>
            <div className="mt-3">
                <h4>{userInfo.first_name} {userInfo.last_name}</h4>
                <p className="text-secondary mb-1">{title}</p>
                <p className="text-muted font-size-sm">{location}</p>
            </div>
        </React.Fragment> 
    )
}



function EditProfileModal({showEdit, handleEditClose, user, profile}){

    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")

    const handleEdit = (e) => {
        e.preventDefault()
        fetch('/edit-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify({
                image: image,
                title: title,
                location: location,
                profile_id: user,
            }),
        })
        .then(res => res.json())
        .then(data => console.log(data))
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
                        <input type="file" name="profile_image" accept="image/*" onChange={(e) => setImage(e.target.value)}/>
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

