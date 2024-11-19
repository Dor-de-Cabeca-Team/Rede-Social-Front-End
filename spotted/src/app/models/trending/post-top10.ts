import { TagTop10 } from "./tag-top10";

export class PostTop10 {
  id!: string; 
  conteudo!: string;
  tags!: TagTop10[];

  constructor(id: string, conteudo: string, tags: TagTop10[]) {
    this.id = id;
    this.conteudo = conteudo;
    this.tags = tags;
  }
}
