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
    userId!: String;
    tags!: Tag[];
    comments!: CommentDto[];

    constructor(conteudo: string, liked: boolean, likeCount: number, profileAnimal: number, tags: Tag[]) {
        this.id = '';
        this.conteudo = conteudo;
        this.liked = liked;
        this.likeCount = likeCount;
        this.comments = [];
        this.data = new Date();
        this.profileAnimal = profileAnimal;
        this.tags = tags;
    }    
}
