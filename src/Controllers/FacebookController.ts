import { Request, Response, NextFunction } from 'express';

import axios from 'axios';
import { FacebookRequest } from '../Models/FacebookModel/FacebookRequest';
import { FacebookResponse } from '../Models/FacebookModel/FacebookResponse';
import { createDate } from "../UseCases/Facebook";

export const getAds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req.query as unknown as FacebookRequest

    // mock date para testes
    const date = new Date(request.date)
    const timeRange = createDate(date)
    const adsTotal = await fetchUrl(request, timeRange)
    const adsSpent = await adsTotal as FacebookResponse
    res.send(adsSpent.data[0].spend)
};

export const fetchUrl = async (request: FacebookRequest, timeRange: string): Promise<FacebookResponse> => {
    const facebookId = "act_111843185574266"
    return axios.get(`https://graph.facebook.com/v17.0/act_111843185574266/insights`, {
        params: {
            fields: "spend",
            access_token: request.access_token,
            time_increment: 1,
            time_range: timeRange.toString()
        },
    }).then(function (response) {
        console.log(response.data.toString())
        return response.data
    }).catch(function (error) {
        console.log(error)
        return error
    });
};

