import { Request, Response, NextFunction } from 'express';
import { HotmarRequest } from '../../data/model/hotmart/SalesRequest';
import { SalesUseCase } from "../../domain/SalesUseCases";
import { getToken, fetchUrl } from '../../data/repository/HotmartRepository';
import { HotmartResponse } from '../../data/model/hotmart/SalesResponse';

export const getSalesInAMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await getAuthParams(req, next)
    const  [firstDayOfMonth, lastDayOfMonth] = SalesUseCase.getMonthStart((req.query as any as HotmarRequest).date)
    let response = await fetchUrl(token, firstDayOfMonth, lastDayOfMonth)

    let listOfItems = [response.items]
    let pageToken = response.page_info?.next_page_token
    while (pageToken != null) {
        const lastResponse = await fetchUrl(token, firstDayOfMonth, lastDayOfMonth, pageToken) 
        const items = lastResponse.items
        listOfItems = listOfItems.concat(items)
        pageToken = lastResponse.page_info?.next_page_token
    }
    console.log("merged response: " + listOfItems.flat())
    const listOfSales = SalesUseCase.getSalesInAMonth(listOfItems.flat(), firstDayOfMonth)
    res.send(listOfSales)
}

export const getSalesInADay = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await getAuthParams(req, next)
    const [dayStart, dayEnd] = SalesUseCase.getDayDuration((req.query as any as HotmarRequest).date)
    const response = await fetchUrl(token, dayStart, dayEnd)
    if (SalesUseCase.isForeignCurrency(response.items)) {
        res.send("Faça o cálculo manualmente")
        return
    }
    let daySales = 0
    for (const item of response.items) {
        daySales += SalesUseCase.getComission(item)
    } 
    res.send(daySales.toString())
};

export const getAuthParams = async (req: Request, next : NextFunction): Promise<string> => {
    const request = req.query as any as HotmarRequest
    const token = (await getToken(request, next)).access_token
    return token
}

// Verifica quantos Método Auei foram vendidos no dia
export const getMethod = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await getAuthParams(req, next)
    const [dayStart, dayEnd] = SalesUseCase.getDayDuration((req.query as any as HotmarRequest).date)
    const response = await fetchUrl(token, dayStart, dayEnd)
    const methodsSold = SalesUseCase.getMethodSold(response.items)
    res.send(methodsSold)
}

// Verifica quantas ESCOLA FIFA AUEI 2.0 foram vendidos no dia
export const getSchool = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await getAuthParams(req, next)
    const [dayStart, dayEnd] = SalesUseCase.getDayDuration((req as any as HotmarRequest).date)
    const response = await fetchUrl(token, dayStart, dayEnd)
    const schoolsSold = SalesUseCase.getSchoolsSold(response.items)
    res.send(schoolsSold)
}
