function ManageRideModal({showManage, handleManageClose, passengers}){


    return(
        <Modal show={showManage} onHide={handleManageClose}>
            <Modal.Header closeButton>
            <Modal.Title>MANAGE PASSENGERS </Modal.Title>
            </Modal.Header>
            <Modal.Body> {passengers} </Modal.Body>
            <Modal.Footer> Double click to remove a passenger. This action is <span>permanent.</span> </Modal.Footer>
        </Modal>
    )}
