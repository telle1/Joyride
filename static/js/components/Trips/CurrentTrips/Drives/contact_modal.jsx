function ContactInfoModal({showInfo, handleInfoClose, request}){
 //This is being used for both the passenger & request modal on the driving page & the riding page
    return(
        <Modal show={showInfo} onHide={handleInfoClose}>
            <Modal.Header closeButton>
            <Modal.Title>CONTACT INFO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><span className="mr-2 font-weight-bold">Email:</span>{request.email}</p>
                <p><span className="mr-2 font-weight-bold">Phone Number:</span>{request.phone_num}</p>
                <Link to={`/profile/${request.user_id}`}>View profile</Link>
            </Modal.Body>
        </Modal>
    )}