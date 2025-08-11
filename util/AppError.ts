export class AppError { //Essa aqui é uma classe personalizada de erro, logo vamos utiliza-la sempre que quisermos lançar um erro 'nosso', que nós pré configuramos.
    message: string;

    constructor(message: string) {
        this.message = message
    }
}