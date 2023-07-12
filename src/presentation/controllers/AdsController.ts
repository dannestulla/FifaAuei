import { Request, Response, NextFunction } from 'express';

import { FacebookRequest } from '../../data/model/facebook/AdsRequest';
import { getAllMonth, createAdsList } from "../../domain/AdsUseCases";
import { fetchUrl } from "../../data/repository/FacebookRepository";

export const getAdsInAMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req.query as unknown as FacebookRequest
    const date = new Date(request.date)
    const timeRange = getAllMonth(date)
    let response = await fetchUrl(request, timeRange)
    
    let listOfItems = [response.data]
    let pageToken = response.paging?.cursors?.after
    while(response.data.length !== 0) {
        const lastResponse = await fetchUrl(request, timeRange, pageToken)
        listOfItems = listOfItems.concat(lastResponse.data)
        pageToken = lastResponse.paging?.cursors?.after
        response = lastResponse
    }
    const listOfAds = createAdsList(listOfItems.flat())
    res.send(listOfAds)
};
