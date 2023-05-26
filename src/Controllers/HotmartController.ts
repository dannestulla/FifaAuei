import { HotmarRequest } from '../Models/HotmarRequest';
import { HotmartResponse } from '../Models/HotmartResponse';
import { HotmartToken } from "../Models/HotmartToken";
import { HotmartUseCase } from "../UseCases/Hotmart";
import axios from 'axios';

export const getSales = async (
    date: Date, 
    request: HotmarRequest,
) : Promise<string> => {
    /* 
    var cache = CacheService.getScriptCache()
    var storedData = cache.get(date.toString)
    if (storedData != null) {
      return storedData
    }
    var token = 'Bearer ' + cache.get('token');
    */
    const token = await authUser(request)
    const currentDay = HotmartUseCase.getCurrentDayMilisec(date)
    const response = await fetchUrl(token.access_token, currentDay[0], currentDay[1])
    const total = HotmartUseCase.comissionCalc(response.items)
    //cache.put(date.toString(), storedData)
    
    return total
}

export const authUser = async (request: HotmarRequest): Promise<HotmartToken> => {
    return axios.get('https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials', {
        params: {
            client_id: request.client_id,
            client_secret: request.client_secret
        }
    }).then(function (response) {
        return response.data
    }).catch(function (error) {
        return error
    });
}

export const fetchUrl = async (token: string, start_date: number, end_date: number): Promise<HotmartResponse> => {
    return axios.post('https://developers.hotmart.com/payments/api/v1/sales/history', {
        headers: {
            'Authorization': token
        }, params: {
            start_date: start_date,
            end_date: end_date
        }
    }).then(function (response) {
        return response.data
    }).catch(function (error) {
        return error
    });
}
