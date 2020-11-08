function NavBar(){
    return (
        <div>
            <nav className="navbar navbar-expand-md fixed-top navbar-custom">
                <div className="container">
                    <Link to="/post" className="navbar-brand">Joyride</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <button className="btn navbar-btn shadow-none" data-toggle="modal" data-target="#login">Log In</button>
                        </li>
                        <li className="nav-item">
                        <button className="btn navbar-btn shadow-none" data-toggle="modal" data-target="#signup">Sign Up</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}