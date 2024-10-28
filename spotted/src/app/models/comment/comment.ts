export class Comment {
  uuid!: string;
  data!: Date;
  conteudo!: string;
  valido!: boolean;
  complaints!: number[];
  likes!: number[];
  user!: string; // talvez será removido
  post!: string;  // uuid do post

  constructor(uuid: string, data: Date, conteudo: string, valido: boolean, user: string, post: string) {
    this.uuid = uuid;
    this.data = data;
    this.conteudo = conteudo;
    this.valido = valido;
    this.complaints = [];
    this.likes = [];
    this.user = user;
    this.post = post;
  }
}
