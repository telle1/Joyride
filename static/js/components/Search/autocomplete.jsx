const {useState, useEffect, useRef} = React;

// let autoComplete;
// // dynamically load JavaScript files in our html with callback when finished
// const loadScript = (url, callback) => {
//     let script = document.createElement("script"); // create script tag
//     script.type = "text/javascript";
  
//     // when script state is ready and loaded or complete we will call callback
//     if (script.readyState) {
//       script.onreadystatechange = function() {
//         if (script.readyState === "loaded" || script.readyState === "complete") {
//           script.onreadystatechange = null;
//           callback();
//         }
//       };
//     } else {
//       script.onload = () => callback();
//     }
//     script.src = url; // load by url
//     document.getElementsByTagName("head")[0].appendChild(script); // append to head
//   };


// // handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
// function handleScriptLoad(updateQuery, autoCompleteRef) {
//     // assign autoComplete with Google maps place one time
//     autoComplete = new window.google.maps.places.Autocomplete(
//       autoCompleteRef.current,
//       { types: ["(cities)"], componentRestrictions: { country: "us" } }
//     );
//     autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
//     // add a listener to handle when the place is selected
//     autoComplete.addListener("place_changed", () =>
//       handlePlaceSelect(updateQuery)
//     );
//   }


// async function handlePlaceSelect(updateQuery) {
//     const addressObject = autoComplete.getPlace(); // get place from google api
//     const query = addressObject.formatted_address;
//     updateQuery(query);
//     console.log(addressObject);
//   }

// function SearchLocationInput({input, setInput}) {
// // const [from, setFrom] = useState("");
// const autoCompleteFromRef = useRef(null);

// useEffect(() => {
//     console.log(autoCompleteFromRef)
//     loadScript(
//     `https://maps.googleapis.com/maps/api/js?key=AIzaSyCzk5tSbrgXGYOB-CPCMAd3pvcObnK8oow&libraries=places`,
//     () => {
//         // handleScriptLoad(setFrom, autoCompleteFromRef)
//         handleScriptLoad(setInput, autoCompleteFromRef)
//     })

// }, []);


// return (
//     <div>
//     <input type="text" className="form-control mr-2"
//         // onChange={event => setFrom(event.target.value)}
//         onChange={event => setInput(event.target.value)}
//         placeholder="Start Location"
//         value={input}
//         ref={autoCompleteFromRef} 
//     />
//     </div>
// );
// }

    {/* <input type="text" className="form-control mr-2"
    ref={autoCompleteRef}
    onChange={event => setQuery2(event.target.value)}
    placeholder="End Location"
    value={query2}
    /> */}

{/* <input type="text" className="form-control mr-2" name="from_input" id = "from_input" value={startInput} onChange={(e)=>setStartInput(e.target.value)} placeholder="Start Location" required/>
<input type="text" className="form-control mr-2" name="to_input" id= "to_input" value={endInput} onChange={(e)=>setEndInput(e.target.value)} placeholder="Destination" required/>
<input type="date" className="form-control mr-2" name="date"/>
<button type="submit" className="btn btn-theme my-1">Search</button>
</form> */}

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.autocompleteInput = React.createRef();
//     this.autocomplete = null;
//     // this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
//   }

//   componentDidMount() {
//     this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
//         {"types": ["geocode"]});
//     this.autocomplete.addListener('place_changed', console.log('hi'));
//   }

//   // handlePlaceChanged(){
//   //   const place = this.autocomplete.getPlace();
//   //   this.props.onPlaceLoaded(place);
//   // }

//   render() {
//     return (
//         <div>
//           <input ref={this.autocompleteInput}  id="autocomplete" placeholder="Enter your address"
//           type="text"></input>
//       </div>
//     );
//   }
// } 

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