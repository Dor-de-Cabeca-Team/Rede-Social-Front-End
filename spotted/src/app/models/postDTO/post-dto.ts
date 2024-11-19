import { CommentDto } from '../commentDTO/comment-dto';
import { Tag } from '../tag/tag';

export class PostDTO {
    id!:string
    conteudo!: string;
    liked?: boolean;
    reported?:boolean;
    likeCount!: number;
    data!:Date;
    profileAnimal!: number;
    imagem?: string;
    imagemNome?: string;
    tags!: Tag[];
    comments!: CommentDto[];
}
