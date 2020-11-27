function SearchBar({input, setInput, placeholder}){

  const autoCompleteRef = useRef(null);
  let autoComplete;

  useEffect(() => {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current,
      {types: ["(cities)"], componentRestrictions: {country: "US"}}
    );
    autoComplete.setFields(["address_components", "formatted_address"]); 
    autoComplete.addListener("place_changed", () => handlePlaceSelect())
    
  })

  async function handlePlaceSelect(){
    const addressObject = autoComplete.getPlace(); //object containing informatinon about the input
    const formattedAddress = addressObject.formatted_address; //the name i.e. "Tracy, CA, USA"
    setInput(formattedAddress)
    console.log('THIS IS THE ADDRESS OBJECT', addressObject)
    console.log('THIS IS THE QUERY', formattedAddress)
  };

  return (
    <React.Fragment>
      <input ref={autoCompleteRef} className="form-control mr-2" name="autocomplete" placeholder={placeholder}
      value = {input} onChange={(e) => setInput(e.target.value)} type="text"></input>
    </React.Fragment>
  );
}