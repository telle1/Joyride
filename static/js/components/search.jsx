const { useState, useEffect } = React 


function Search(){

    const onSubmit = (evt) => {
        evt.preventDefault();
        
    }
    // useEffect(() => {

    // })
    return (
        <div className="container search-container">
            <div className="row">
                <form action='/search-results' className="form-inline mx-auto" id="search-rides">
                    <input type="text" className="form-control mr-2" name="from_input" id = "from_input" placeholder="Start Location" required/>
                    <input type="text" className="form-control mr-2" name="to_input" id= "to_input" placeholder="Destination" required/>
                    <input type="date" className="form-control mr-2" name="date"/>
                    <button type="submit" className="btn btn-theme my-1">Search</button>
                </form>
            </div>
          <div id="msg" className="mt-3"></div>
          <div>TEST</div>
        </div>
    )
}