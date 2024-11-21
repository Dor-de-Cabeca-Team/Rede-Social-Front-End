import { CommentDto } from "../commentDTO/comment-dto";
import { TagTop10 } from "./tag-top10";

export class PostTop10 {
  id!: string; 
  conteudo!: string;
  tags!: TagTop10[];
  comments!: CommentDto[];

  constructor(id: string, conteudo: string, tags: TagTop10[], comments: CommentDto[]) {
    this.id = id;
    this.conteudo = conteudo;
    this.tags = tags;
    this.comments = comments;
  }
}
