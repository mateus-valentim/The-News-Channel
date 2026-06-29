import {apiFormRequest} from "@/app/utils/apiClient";

export const ImageActions = (image: File):Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append('image', image);
        return apiFormRequest('api/v1/images/upload', formData, 'POST');

}