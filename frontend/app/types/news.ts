interface ContentJson {
    type: string;
    content: {
        type: string;
        text?: string;
    }[];
}

export interface News {
    id: number
    title: string;
    cover_image: string;
    content_json: ContentJson;
    views: number;
    updated_at: string;
    created_at: string;
    category:{
        id: number;
        name: string;
    };
    user:{
        id: number;
        name: string;
    };
    tags:{
        id: number;
        name: string;
    }[];
}