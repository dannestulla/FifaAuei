import { NextFunction } from "express";
import { HotmarRequest } from "../model/hotmart/SalesRequest";
import { HotmartResponse } from "../model/hotmart/SalesResponse";
import { HotmartToken } from "../model/hotmart/SalesToken";
import axios from 'axios';

export const getToken = async (request: HotmarRequest, next: NextFunction): Promise<HotmartToken> => {
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
        console.log("Hotmart OK")
        return response.data
    }).catch(function (error) {
        console.log("Hotmart token error :" + error.response)
        next(error)
    });
};

export const fetchUrl = async (token: string, dayStart : number, dayEnd?: number, pageToken?: string): Promise<HotmartResponse> => {
    return axios.get('https://developers.hotmart.com/payments/api/v1/sales/history', {
        params: {
            start_date: dayStart,
            end_date: dayEnd,
            page_token: pageToken
        },
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(function (response) {
        console.log("Hotmart fetchUrl Ok: " + response.data.toString())
        return response.data as any as HotmartResponse
    }).catch(function (error) {
        console.log("Hotmart fetchUrl error :" + error.response)
        return error
    });
};