import {apiRequest, apiFormRequest} from "@/app/utils/apiClient";
import {News} from "@/app/types/news";
import {Pagination} from "@/app/types/paginate";


export const NewsActions = {
    getAll: (params?: {title?:string; category_id?: number; user_id?: number; tag_id?: number[]; page?:number; sort_by?:string; order_by?:string; paginate_by?:string}) => {
        return apiRequest<Pagination<News>>('/api/v1/news', 'GET', params);
    },

    getOne: (id: number) => {
        return apiRequest<News>(`/api/v1/news/${id}`, 'GET');
    },

    create: (data: FormData) => {
        return apiFormRequest<News>('/api/v1/news', data, 'POST');
    },

    update: (id: number, data: FormData) => {
        return apiFormRequest<News>(`/api/v1/news/${id}`, data, 'PUT');
    },


    delete: (id: number) => {
        return apiRequest<{ message: string }>(`/api/v1/news/${id}`, 'DELETE');
    },



}