const {useRef, useEffect} = React;

function MyGoogleMap(){

    const mapRef = useRef(null);
    let map;
    let marker;
    let sf = {lat: 37.7749, lng: -122.4194}
    let options = {
        zoom: 5,
        center: sf
    }

    useEffect(() => {
        map = new window.google.maps.Map(mapRef.current, options);
        marker = new window.google.maps.Marker({position: sf, map: map});
    })

    return (
        <React.Fragment>
            <div ref={mapRef} id="map" style={{width: 590, height: 540}}></div>
        </React.Fragment>
    )
}