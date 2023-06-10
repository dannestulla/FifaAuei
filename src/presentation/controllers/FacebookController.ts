import { Request, Response, NextFunction } from 'express';

import { FacebookRequest } from '../../data/model/facebook/FacebookRequest';
import { FacebookResponse } from '../../data/model/facebook/FacebookResponse';
import { createDate } from "../../domain/FacebookUseCases";
import { fetchUrl } from "../../data/repository/FacebookRepository";

export const getAds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req.query as unknown as FacebookRequest
    const date = new Date(request.date)
    const timeRange = createDate(date)
    const adsTotal = await fetchUrl(request, timeRange)
    const adsSpent = adsTotal as FacebookResponse
    res.send(adsSpent.data[0].spend)
};
