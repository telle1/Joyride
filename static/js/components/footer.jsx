function Footer(){
    return (
        <footer className= "footer">
            <div className="container"> 
                {/* <!-- Copyright --> */}
                <div className="row">
                <div className="col-md-6">
                    <p id="app-name"> Joyride</p>
                    &copy; 2020 Tiffany Luu
                </div>
                <div className="col-md-3">
                    <p>
                    <i className="fas fa-envelope fa-2x mr-1" data-fa-transform="left-2 down-4"></i>
                    tiffanyell1@gmail.com
                    </p>
                    <p>
                    <i className="fab fa-linkedin fa-2x mr-2" data-fa-transform="down-3"></i>
                    <a href="https://www.linkedin.com/in/tiffany-luu-088b07143/" target="_blank">Click here</a>
                    </p>
                    <p><i className="fab fa-github fa-2x mr-1" data-fa-transform="down-3 left-2"></i>
                    <a href="https://github.com/telle1" target="_blank">Click here</a>
                    </p>
                </div>
                <div className="col-md-3">
                    <h3>About Us</h3>
                    <p>Joyride was created in November 2020 by <a href="https://www.linkedin.com/in/tiffany-luu-088b07143/" target="_blank">Tiffany Luu</a>, 
                    a student of Hackbright Academy, with the aim of increasing affordability for long-distance travel.
                    </p>
                </div>
                </div>  
            </div>  
        </footer>
    )
}
