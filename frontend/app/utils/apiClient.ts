import axios from '../lib/axios'

export async function apiRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    payload?: unknown
):Promise<T> {
    const config = method === 'GET'
        ? {params: payload} : {data: payload}

    const response = await axios({
        url: endpoint,
        method: method,
        ...config,
    })

    return response.data
}

export async function apiFormRequest<T>(
    endpoint: string,
    formData: FormData,
    method: 'POST' | 'PUT' = 'POST',
): Promise<T> {

    let axiosMethod = method;
    if(method == 'PUT') {
        axiosMethod = 'POST';
        formData.append('_method', 'PUT');
    }

    const response = await axios({
        url: endpoint,
        method: axiosMethod,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}