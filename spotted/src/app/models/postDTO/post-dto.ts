import { CommentDto } from '../commentDTO/comment-dto';
import { Tag } from '../tag/tag';

export class PostDTO {
    uuid!:string
    conteudo!: string;
    isLiked?: boolean;
    likeCount!: number;
    comments!: CommentDto[];
    data!:Date;
    valido!: boolean;
    profileAnimal!: number;
    imagem?: string;
    imagemNome?: string;
    tags!: Tag[];

    constructor(conteudo: string, isLiked: boolean, likeCount: number, profileAnimal: number, tags: Tag[]) {
        this.uuid = '';
        this.conteudo = conteudo;
        this.isLiked = isLiked;
        this.likeCount = likeCount;
        this.comments = [];
        this.data = new Date();
        this.profileAnimal = profileAnimal;
        this.tags = tags;
    }    
}
