import { getAuthParams } from "../../presentation/controllers/HotmartController";
import { HotmarRequest } from "../model/hotmart/HotmarRequest";
import { HotmartResponse } from "../model/hotmart/HotmartResponse";
import { HotmartToken } from "../model/hotmart/HotmartToken";
import axios from 'axios';


export const getToken = async (request: HotmarRequest): Promise<HotmartToken> => {
    return axios.post('https://api-sec-vlc.hotmart.com/security/oauth/token', null, {
        params: {
            grant_type: "client_credentials",
            client_id: request.client_id,
            client_secret: request.client_secret
        },
        headers: {
            Authorization: request.authorization
        }
    }).then(function (response) {
        console.log("OK auth")
        return response.data
    }).catch(function (error) {
        console.log("Error status code: " + error.response)
        return error
    });
};

export const fetchUrl = async (token: string, dayStart : number, dayEnd: number): Promise<HotmartResponse> => {
    return axios.get('https://developers.hotmart.com/payments/api/v1/sales/history', {
        params: {
            start_date: dayStart,
            end_date: dayEnd
        },
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(function (response) {
        console.log("Fetch OK: " + response.data.toString())
        return response.data
    }).catch(function (error) {
        console.log("error :" + error)
        return error
    });
};