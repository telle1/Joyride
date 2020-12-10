function CurrentRides({ setShowAlert }) {
  const [currentRides, setCurrentRides] = useState([]);

  const fetchRides = () => {
    fetch('/current-rides')
      .then((res) => res.json())
      .then((data) => {
        setCurrentRides(data.rides);
        // console.log(data.rides)
      });
  };

  useEffect(() => {
    console.log('THESE ARE CURRENT RIDES', currentRides);
    fetchRides();
  }, []);

  return (
    <React.Fragment>
      <div className='riding'>
        <h3 className='table-header'>RIDING</h3>
        <Table bordered striped hover>
          <TableHeader
            col2='Location'
            col3='Driver'
            col4='Seats Requested'
            col5='Cost(Total)'
          ></TableHeader>
          <tbody>
            {currentRides.map((currentRide) => (
              <RideListItem
                key={currentRide.request_id}
                currentRide={currentRide}
                fetchRides={fetchRides}
                setShowAlert={setShowAlert}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

function RideListItem({ currentRide, setShowAlert, fetchRides }) {
  //Cancel ride/Delete ride modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //Edit seats modal
  const [showEdit, setShowEdit] = useState(false);
  const handleEditShow = () => setShowEdit(true);
  const handleEditClose = () => setShowEdit(false);
  //Driver contact modal
  const [showInfo, setShowInfo] = useState(false);
  const handleInfoShow = () => setShowInfo(true);
  const handleInfoClose = () => setShowInfo(false);

  return (
    <tr key={currentRide.request_id}>
      <td>
        {/* Edit Seats Request Modal */}
        <p>{currentRide.date} </p>
        {/* <p>REQUEST{currentRide.request_id} RIDER ID{currentRide.rider_id} FOR RIDE{currentRide.ride_id}</p> */}
        {currentRide.status === 'Pending' ? (
          <React.Fragment>
            <button className='btn btn-yellow mr-2' onClick={handleEditShow}>
              Edit Seats
            </button>
            <SeatsModal
              showEdit={showEdit}
              handleEditClose={handleEditClose}
              fetchRides={fetchRides}
              request_id={currentRide.request_id}
              oldSeats={currentRide.seats_requested}
              seatsAvailable={currentRide.seats_available}
              setShowAlert={setShowAlert}
            />
          </React.Fragment>
        ) : (
          <button className='btn btn-yellow mr-2' disabled={true}>
            Edit Seats
          </button>
        )}
        {/* Cancel Ride Modal */}
        {currentRide.status === 'Pending' ||
        currentRide.status === 'Approved' ? (
          <button className='btn btn-danger' onClick={handleShow}>
            {' '}
            Cancel{' '}
          </button>
        ) : (
          <button className='btn btn-theme' onClick={handleShow}>
            {' '}
            Delete{' '}
          </button>
        )}
        <CnclModal
          key={currentRide.request_id}
          show={show}
          handleClose={handleClose}
          fetchRides={fetchRides}
          request_id={currentRide.request_id}
          seats={currentRide.seats_requested}
          status={currentRide.status}
          setShowAlert={setShowAlert}
        />
      </td>
      <td>
        {' '}
        {currentRide.start_loc} -> <br /> {currentRide.end_loc}
      </td>
      <td>
        <a href='#' onClick={handleInfoShow}>
          {currentRide.driver.first_name} {currentRide.driver.last_name}
        </a>
        <ContactInfoModal
          showInfo={showInfo}
          handleInfoClose={handleInfoClose}
          request={currentRide.driver}
        />
      </td>
      <td> {currentRide.seats_requested} </td>
      <td> ${currentRide.cost * currentRide.seats_requested} </td>
      <td> {currentRide.status}</td>
    </tr>
  );
}
