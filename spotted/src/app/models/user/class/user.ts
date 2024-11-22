export class User {
    nome!:string;
    email!:string;
    senha!:string;
    idade!:number;

    constructor(nome:string, email:string, senha:string, idade:number){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.idade = idade;
    }
}
