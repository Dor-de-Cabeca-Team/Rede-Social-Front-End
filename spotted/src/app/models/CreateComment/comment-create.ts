export class CommentCreate {
    id!:string;
    conteudo!:string
    post!:string
    user!:string

    constructor(id:string, conteudo:string, post:string, user:string){
        this.id = id;
        this.conteudo = conteudo;
        this.post = post;
        this.user = user;
    }
}
