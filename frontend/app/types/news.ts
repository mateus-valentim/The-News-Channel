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
    content_html: string,
    views: number;
    updated_at: string;
    created_at: string;
    category_id: number;
    user_id: number;
    category:{
        id: number;
        name: string;
    };
    user:{
        id: number;
        name: string;
        profile_image: string;

    };
    tags:{
        id: number;
        name: string;
    }[];
}