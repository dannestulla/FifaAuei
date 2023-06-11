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
    const adsTotal = await fetchUrl(request, timeRange)
    const adsSpent = adsTotal as FacebookResponse
    const listOfAds = createAdsList(adsSpent.data)
    res.send(listOfAds)
};
