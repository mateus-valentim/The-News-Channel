
import {Tag} from '@/app/types/tag'
import {Pagination} from "@/app/types/paginate";
import {apiFormRequest, apiRequest} from "@/app/utils/apiClient";

export const TagActions = {
    getOne: (id: number) => {
        return apiRequest<Pagination<Tag>>(`/api/tags/${id}`, 'GET');
    },

    getAll: (params?:{name?:string; page?:number; sort_by?:string; order_by?:string; paginate_by?:string})=> {
        return apiRequest<Pagination<Tag>>('/api/tags', 'GET', params);
    },

    delete: (id: number) => {
        return apiRequest<{message: string}>(`/api/tags/${id}`, 'DELETE');
    },

    create: (data: FormData) => {
        return apiFormRequest<Tag>('/api/tags', data, 'POST');
    },

    update: (id: number, data: FormData) => {
        return apiFormRequest<Tag>(`/api/tags/${id}`, data, 'PUT');
    }
}