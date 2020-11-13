function ContactInfoModal({showInfo, handleInfoClose, request}){

    return(
        <Modal show={showInfo} onHide={handleInfoClose}>
            <Modal.Header closeButton>
            <Modal.Title>CONTACT INFO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><span className="mr-2 font-weight-bold">Email:</span>{request.email}</p>
                <p><span className="mr-2 font-weight-bold">Phone Number:</span>{request.phone_num}</p>
            </Modal.Body>
        </Modal>
    )}