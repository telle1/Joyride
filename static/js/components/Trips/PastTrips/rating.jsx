function StarRating({setRating, rating, cursor}){
    // const [rating, setRating]= useState(0)
    // cannot have it here since I need to use this in the form, put it in the parent and pass it down as props
    return (
    <React.Fragment>
        {[...Array(5)].map((star,i) => {
            let starValue = i +1;
            if (starValue <= rating){
                starValue *= -1 //negative values = yellow star; positive values = gray star
            }
            return(
                <label key={starValue}>
                    <input type="radio" name="rating-star" className="rating-star-radio" value={starValue}
                    onClick={() => setRating(Math.abs(starValue))}/>
                    
                    {(starValue <= rating) ? 
                        <Star key={starValue} colorInput="#eba92a" cursor={cursor}/> 
                        : <Star key={starValue} colorInput="#ececec" cursor={cursor}/>}
                </label>
                );
        })} 
    </React.Fragment>
    )
}

function Star ({colorInput, cursor}){
    return (
        <React.Fragment>
            <i className={`fas fa-star ${cursor}`} style={{color: colorInput}}></i>
        </React.Fragment>
    )
}


