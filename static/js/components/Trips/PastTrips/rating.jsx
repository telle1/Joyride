function StarRating({setRating, rating}){
    // const [rating, setRating]= useState(0)
    // cannot have it here since I need to use this in the form, put it in the parent and pass it down as props
    return (
    <React.Fragment>
        {[...Array(5)].map((star,i) => {
            let starValue = i +1;
            if (starValue <= rating){
                starValue *= -1 //negative values = yellow star; positive values = gray star
            }
            // console.log('STAR VALUE', starValue, 'RATING:', rating)
            return(
                <label key={starValue}>
                    <input type="radio" name="rating-star" className="rating-star-radio" value={starValue}
                    onClick={() => setRating(Math.abs(starValue))}/>
                    
                    {(starValue <= rating) ? 
                        <Star key={starValue} colorInput="#eba92a" onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}/> 
                        : <Star key={starValue} colorInput="#ececec"onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}/>}
                </label>
                );
        })} 
    </React.Fragment>
    )
}

function Star ({colorInput}){
    return (
        <React.Fragment>
            <i className="fas fa-star rating-star" style={{color: colorInput}}></i>
        </React.Fragment>
    )
}
