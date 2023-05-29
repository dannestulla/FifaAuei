import { Request, Response, NextFunction } from 'express';
import { HotmarRequest } from '../Models/HotmarRequest';
import { HotmartResponse } from '../Models/HotmartResponse';
import { HotmartToken } from "../Models/HotmartToken";
import { HotmartUseCase } from "../UseCases/Hotmart";
import axios from 'axios';

export const getSales = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req.query as unknown as HotmarRequest
    const token = await authUser(request)
    let mockDate = new Date()
    mockDate.setDate(5)
    const day = HotmartUseCase.getCurrentDayMilisec(mockDate)
    const response = await fetchUrl(token.access_token, day[0], day[1]) as HotmartResponse
    const total = HotmartUseCase.comissionCalc(response.items)
    res.send(total)
};

export const authUser = async (request: HotmarRequest): Promise<HotmartToken> => {
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
        console.log("Error status code: " + error.response.status)
    });
};

export const fetchUrl = async (token: string, start_date: number, end_date: number): Promise<HotmartResponse> => {
    return axios.get('https://developers.hotmart.com/payments/api/v1/sales/history', {
        params: {
            start_date: start_date,
            end_date: end_date
        },
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(function (response) {
        console.log("Fetch OK: "+ response.data.toString())
        return response.data
    }).catch(function (error) {
        console.log("error :" +error )
        return error
    });
};


