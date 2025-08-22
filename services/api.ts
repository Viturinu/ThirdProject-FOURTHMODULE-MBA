import { AppError } from "@/util/AppError";
import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.0.117:3333"
});

api.interceptors.response.use(response => response, error => { //na resposta normal (=== 200+ - 299) ele retorna ela mesmo, no erro (!== 200+ - 299) ele faz a condicional
    if (error.response && error.response.data) { //se tiver data no response, ele está retornando da forma que programamos na API, com mensagem e httpcode, daí vamos utilizar do message apenas;
        return Promise.reject(new AppError(error.response.data.message)) //erro que n[os programamos no backend, que dispara justamente uma resposta com message como atributo //return é necessário para continuar com a requisição, caso contrário isso mata a requisição
    } else { //caso contrário, ele está disparando um erro genérico
        return Promise.reject(error) //erro que a gente não programou, então ele vem sem message (atributo que nós colocamos no 'JSON' de resposta)
    }
})

export { api };