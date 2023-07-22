import React from "react";
import 'materialize-css/dist/css/materialize.min.css';
import VacinasService from "../services/VacinasService";
import M from "materialize-css";
import { Link } from "react-router-dom";

export default class List extends React.Component {

    constructor(){
        super();
        this.vacinasService = new VacinasService();
        this.state = {
            vacinas: [],
        }
    }

    componentDidMount(){
        this.updateTable()
    }

    updateTable(){
        this.vacinasService.findAll().then( response => {
            // console.log(response);
            // console.log(response.data);
            // this.state.vacinas = response.data;
            this.setState({
                vacinas: response.data
            })
            // console.log(this.state.vacinas);
        })
    }

    delete(id){
        this.vacinasService.delete(id)
        .then(response => {
            this.updateTable()
            M.toast({html: 'Vacina deletada com sucesso!'})
        })
    }

    render() {
        return (

        < div className="container" >
            <nav>
                <div className="nav-wrapper" style={{ backgroundColor: '#497e99' }}>
                    <a href="/home" className="brand-logo" >Digital Vaccine</a>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link to="/form">Adicionar Vacina</Link>
                            {/* <a href="/form">Adicionar Vacina</a> */}
                        </li>
                        <li>
                            <Link to="/sair">Sair</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="content">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Fabricante</th>
                            <th>Protege Contra</th>
                            <th>Composicao</th>
                            <th>Esquema Basico</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.vacinas.map( vacina => (
                                <tr key={vacina.ID_Vacina}>
                                    <td>{vacina.Nome}</td>
                                    <td>{vacina.Fabricante}</td>
                                    <td>{vacina.ProtecaoContra}</td>
                                    <td>{vacina.Composicao}</td>
                                    <td>{vacina.EsquemaBasico}</td>
                                    <td>
                                        <Link to={`/form/${vacina.ID_Vacina}`}><i className="material-icons">edit</i></Link>
                                        {/* <a href="#" className="material-icons">edit</a> */}
                                        <a href="#" onClick={ () => this.delete(vacina.ID_Vacina) } className="material-icons">delete</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div >

        )
    }
}