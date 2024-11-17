export class CommentDto {
    uuid!: string;
    data!: Date;
    conteudo!: string;
    valido!: boolean;
    complaints!: number[];
    likes!: number[];
    profileAnimal!: number;
    imagem?: string;
    imagemNome?: string;
  
    constructor(uuid: string, data: Date, conteudo: string, valido: boolean) {
      this.uuid = uuid;
      this.data = data;
      this.conteudo = conteudo;
      this.valido = valido;
    }
  }
  