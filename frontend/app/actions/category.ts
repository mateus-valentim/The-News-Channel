import {apiRequest, apiFormRequest} from "@/app/utils/apiClient";
import {Category} from "@/app/types/category";
import {Pagination} from "@/app/types/paginate";


export const CategoryActions = {
    getAll: (params?: {name?:string; page?:number; sort_by?:string; sort_order?:string; paginate_by?:string}) => {
        return apiRequest<Pagination<Category>>('/api/v1/categories', 'GET', params);
    },

    getOne: (id: number) => {
        return apiRequest<Pagination<Category>>(`/api/v1/categories/${id}`, 'GET');
    },

    create: (data: FormData) => {
        return apiFormRequest<Category>('/api/v1/categories', data, 'POST');
    },

    update: (id: number, data: FormData) => {
        return apiFormRequest<Category>(`/api/v1/categories/${id}`, data, 'PUT');
    },

    delete: (id: number) => {
        return apiRequest<{ message: string }>(`/api/v1/categories/${id}`, 'DELETE');
    }


}