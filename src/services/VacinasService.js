import axios from 'axios';
export default class VacinasService {

    constructor(){
        this.urlApi = 'http://localhost:5000/vacinas';
    }

    findAll() {
        return axios.get(this.urlApi);
    }
    
    findById(id) {
        return axios.get(`${this.urlApi}/${id}`);
    }
     
    delete(id) {
        return axios.delete(`${this.urlApi}/${id}`);
    }

    save(vacina) {
        return axios.post(this.urlApi, vacina);
    }
    
    update(vacina) {
        return axios.put(`${this.urlApi}/${vacina.ID_Vacina}`, vacina);
    }
}