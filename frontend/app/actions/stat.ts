import {apiRequest} from "@/app/utils/apiClient";
import {Stats} from '@/app/types/stats'

export const getStats = () => {
    return apiRequest<Stats>('/api/v1/dashboard/stats', 'GET');
}