export class PostCreate {
  userId!: string;
  conteudo!: string;
  tags: { nome: string }[] = [];

  constructor(userId: string, conteudo: string, tags: { nome: string }[] = []) {
    this.userId = userId;
    this.conteudo = conteudo;
    this.tags = tags;
  }
}
