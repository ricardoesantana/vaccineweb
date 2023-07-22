import React from "react";
import { useLocation, useParams  } from "react-router-dom";
import VacinasService from "../services/VacinasService";
import M from "materialize-css";

class FormHist extends React.Component {

    constructor(props){
        super(props);
        this.vacinasService = new VacinasService();
        this.state = {
            Nome: '',
            Fabricante: '',
            Eficácia: null,
            ProtecaoContra: '',
            Composicao: '',
            EsquemaBasico: '',
            Reforco: '',
            IdadeRecomendada: '',
            IntervaloRecomendado: '',
            IntervaloMinimo: ''
        }
        // this.state = {
        //     vacina: {}
        // }

        this.changeHandler = this.changeHandler.bind(this)
    }

    componentDidMount() {
        let id = this.props.match.params.id
        console.log(id)
        if(id){
            // EDIÇÃO
            this.vacinasService.findById(id)
            .then(response => {
            if(response.data){
                this.setState(response.data[0])
                // this.setState({
                //     vacina: response.data[0]
                // })

                let elements = document.getElementsByTagName('label')
                for(let element of elements){
                    element.classList.add('active')
                }
            }else{
                // EXIBIR MENSAGEM
                // M.toast({html: `Não foi encontrada vacina com ID=${id}!`})
                M.toast({html: 'Vacina não encontrada!'})
            }
            console.log(response.data[0])
        })
        }
    }

    changeHandler(event){
        const { name, value } = event.target;
        this.setState({ [name]: value });

        console.log('----------------')
        console.log('NAME: '+event.target.name)
        console.log('VALUE: '+event.target.value)

        // this.setState({[event.target.name]: event.target.value})
        
    }

    save(){
        console.log(this.state.ID_Vacina)
        if(this.state.ID_Vacina){
            console.log('SALVANDO EDIÇÃO')
            this.vacinasService.update(this.state)
            .then( response => {
                M.toast({html: 'Vacina editada com sucesso!'})
                // this.props.history.push("/");
                window.location.assign("/list");
            }).catch( err => {
                console.log(err)
                M.toast({html: 'Ocorreu um erro inesperado!'})
            })
        }else{
            console.log('SALVANDO NOVA VACINA')
            console.log(this.state)
            this.vacinasService.save(this.state)
            .then( response => {
                M.toast({html: 'Vacina salva com sucesso!'})
                // this.props.history.push("/");
                window.location.assign("/list");
            }).catch( err => {
                console.log(err)
                M.toast({html: 'Ocorreu um erro inesperado!'})
            })

        }
    }

    render() {
        return (
            <div className="container">
                <nav>
                    <div className="nav-wrapper" style={{ backgroundColor: '#497e99' }}d>
                        <a href="/home" className="brand-logo">Digital Vaccine</a>
                    </div>
                </nav>

                <div className="row">
                    <h5 className="header">Cadastro de Vacinas</h5>
                </div>

                <div className="content">
                    <form action="">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="nome" name="Nome" type="text" className="validate" value={this.state.Nome} onChange={this.changeHandler} required/>
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="fabricante" name="Fabricante" type="text" className="validate" value={this.state.Fabricante} onChange={this.changeHandler} />
                                <label htmlFor="fabricante">Fabricante</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="protege" name="ProtecaoContra" type="text" className="validate" value={this.state.ProtecaoContra} onChange={this.changeHandler} />
                                <label htmlFor="protege">Protege Contra</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="composicao" name="Composicao" type="text" className="validate" value={this.state.Composicao} onChange={this.changeHandler} />
                                <label htmlFor="composicao">Composicao</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="esquema" name="EsquemaBasico" type="text" className="validate" value={this.state.EsquemaBasico} onChange={this.changeHandler} />
                                <label htmlFor="esquema">Esquema Basico</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4"></div>
                            <div className="col s4"></div>
                            <div className="col s4">
                                <a onClick={ ()=> this.save()} className="waves-effect waves-light btn"><i className="material-icons">save</i>Salvar</a>
                                <a href="/list" className="waves-effect waves-light btn red lighten-2"><i className="material-icons">cancel</i>Cancelar</a>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

const FormWithRouterParams = () => {
    const location = useLocation();
    const params = useParams();
  
    return <FormHist match={{ params }} location={location} />;
  };
  
  export default FormWithRouterParams;