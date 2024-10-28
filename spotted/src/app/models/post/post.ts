export class Post {
  uuid!: string;
  conteudo!: string;
  data!: Date;
  valido!: boolean;
  likes!: number[];
  complaints!: number[];
  comments!: string[];
  imagem?: string;
  imagemNome?: string;

  constructor(uuid: string, conteudo: string, data: Date, valido: boolean) {
    // adicionar tags likes etc
    this.uuid = uuid;
    this.conteudo = conteudo;
    this.data = data;
    this.valido = valido;
    this.complaints = [];
    this.likes = [];
    this.comments = [];
  }
}
