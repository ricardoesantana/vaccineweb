import React from "react";
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from "react-router-dom";

export default class Home extends React.Component {

    render() {
        return (

        < div className="container" >

            <nav>
                <div className="nav-wrapper" style={{ backgroundColor: '#497e99' }}>
                    <a href="/home" className="brand-logo" >Digital Vaccine</a>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link to="/quiz">Quiz</Link>
                        </li>
                        <li>
                            <Link to="/list">Vacinas</Link>
                        </li>
                        <li>
                            <Link to="/sair">Sair</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        </div >

        )
    }
}