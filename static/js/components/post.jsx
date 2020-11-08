function Post(){
    return(
        <div className="container post-ride">
            <div className="row">
            <div className="col-md-5">
                <form action="/post-complete" method="post" className="f-grey">
                <h3 className="mb-3"> Post a Ride</h3>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label for="#">From</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" name="from_input" id="from_input" placeholder="Start Location" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label for="#">To</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" name="to_input" id="to_input" placeholder="End Location" required/>
                    </div> 
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label for="#">Date</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="date" className="form-control" name="date" id="date"/>
                    </div> 
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label for="#">Seats</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="number" className="form-control" name="seats" placeholder="0" min="0"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label for="#">Price</label>
                    </div>
                    <div className="col-sm-9">
                    <input type="number" className="form-control" name="price" placeholder="0" min="0"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className = "col-md-3 col-form-label">
                    <label for="#">Comments</label>
                    </div>
                    <div className="col-sm-9">
                    <textarea className="form-control" name="comments" rows="5"></textarea>
                    </div>
                </div>
                <div className="row">
                <button type="submit" className="btn btn-theme ml-auto mr-3" id= "submit-button">Submit</button>
                </div>
                <p id = "alert" className='text-center'></p>
                </form>
            </div>
            <div className="col-md-7">
                <div id="map"></div>
            </div>
        </div>
    </div>
    )
}