export class CommentDto {
  id!: string;
    data!: Date;
    liked!:boolean;
    reported!:boolean;
    conteudo!: string;
    complaints!: number[];
    likeCount!: number;
    profileAnimal!: number;
    imagem?: string;
    imagemNome?: string;
    post!:string;
    user!:string;
  
    constructor(id: string, data: Date, conteudo: string) {
      this.id = id;
      this.data = data;
      this.conteudo = conteudo;
    }
  }
  