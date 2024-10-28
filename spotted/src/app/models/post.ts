export class Post {
  uuid!: string;
  conteudo!: string;
  data!: Date;
  valido!: boolean;
  imagem?: string;
  imagemNome?: string;

  constructor(uuid: string, conteudo: string, data: Date, valido: boolean) {
    // adicionar tags likes etc
    this.uuid = uuid;
    this.conteudo = conteudo;
    this.data = data;
    this.valido = valido;
  }
}
