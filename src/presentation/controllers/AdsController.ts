import { Request, Response, NextFunction } from 'express';

import { FacebookRequest } from '../../data/model/facebook/AdsRequest';
import { FacebookResponse } from '../../data/model/facebook/AdsResponse';
import { getAllMonth, getOneDay, createAdsList } from "../../domain/AdsUseCases";
import { fetchUrl } from "../../data/repository/FacebookRepository";

export const getAdsInADay = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req.query as unknown as FacebookRequest
    const date = new Date(request.date)
    const timeRange = getOneDay(date)
    const adsTotal = await fetchUrl(request, timeRange)
    const adsSpent = adsTotal as FacebookResponse
    res.send(adsSpent.data[0].spend)
};

export const getAdsInAMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req.query as unknown as FacebookRequest
    const date = new Date(request.date)
    const timeRange = getAllMonth(date)
    const response = await fetchUrl(request, timeRange)
    
    let listOfItems = [response.data]
    let pageToken = response.paging.cursors?.after
    while(pageToken != null) {
        const lastResponse = await fetchUrl(request, timeRange, pageToken)
        listOfItems = listOfItems.concat(lastResponse.data)
        pageToken = lastResponse.paging.cursors?.after
    }
    console.log("list of ads :"+ listOfItems)
    const listOfAds = createAdsList(listOfItems.flat())
    res.send(listOfAds)
};
