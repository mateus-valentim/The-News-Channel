
import {TagType} from '@/app/types/tagType'
import {Pagination} from "@/app/types/paginate";
import {apiFormRequest, apiRequest} from "@/app/utils/apiClient";

export const TagActions = {
    getOne: (id: number) => {
        return apiRequest<Pagination<TagType>>(`/api/v1/tags/${id}`, 'GET');
    },

    getAll: (params?:{name?:string; page?:number; sort_by?:string; order_by?:string; paginate_by?:string})=> {
        return apiRequest<Pagination<TagType>>('/api/v1/tags', 'GET', params);
    },

    getAllNoPag: () => {
        return apiRequest<TagType[]>(`/api/v1/tags/all`, 'GET');
    },


    delete: (id: number) => {
        return apiRequest<{message: string}>(`/api/v1/tags/${id}`, 'DELETE');
    },

    create: (data: FormData) => {
        return apiFormRequest<TagType>('/api/v1/tags', data, 'POST');
    },

    update: (id: number, data: FormData) => {
        return apiFormRequest<TagType>(`/api/v1/tags/${id}`, data, 'PUT');
    }
}