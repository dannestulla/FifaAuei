import { Request, Response, NextFunction } from 'express';
import { HotmarRequest } from '../Models/HotmartModel/HotmarRequest';
import { HotmartResponse, Item } from '../Models/HotmartModel/HotmartResponse';
import { HotmartToken } from "../Models/HotmartModel/HotmartToken";
import { HotmartUseCase } from "../UseCases/Hotmart";
import axios from 'axios';

export const getSales = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req.query as unknown as HotmarRequest
    const token = await authUser(request)
    const date = new Date(request.date)
    const day = HotmartUseCase.getCurrentDayMilisec(date)
    const response = await fetchUrl(token.access_token, day[0], day[1]) as HotmartResponse
    if (HotmartUseCase.isForeignCurrency(response.items)) {
        res.send("Faça o cálculo manualmente") // Compra com moeda estrangeira 
    }
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

export const isForeignCurrency = (items: Item[]) : boolean => {
    let isForeign = false
    for (const itemSelected in items) {
        if ((itemSelected as unknown as Item).purchase.price.currency_code != "BRL" ) {
            console.log("currency code" + (itemSelected as unknown as Item).purchase.price.currency_code)
            isForeign = true
        }
    }
    return isForeign
}

