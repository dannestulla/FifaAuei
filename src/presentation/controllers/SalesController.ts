import { Request, Response, NextFunction } from 'express';
import { HotmarRequest } from '../../data/model/hotmart/SalesRequest';
import { SalesUseCase } from "../../domain/SalesUseCases";
import { getToken, fetchUrl } from '../../data/repository/HotmartRepository';
import { Item } from '../../data/model/hotmart/SalesResponse';

export const getSalesInAMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const [response] = await getResponse(req, next)
    const listOfSales = SalesUseCase.getSalesInAMonth(response)
    res.send(listOfSales)
}

const getResponse = async(req: Request, next: NextFunction) : Promise<[Item[], number]>=> {
    const token = await getAuthParams(req, next)
    const  [firstDayOfMonth, lastDayOfMonth] = SalesUseCase.getMonthDuration((req.query as any as HotmarRequest).date)
    const response = await fetchUrl(token, firstDayOfMonth, lastDayOfMonth)
    let listOfItems = [response.items]
    let pageToken = response.page_info?.next_page_token
    while (pageToken != null) {
        const lastResponse = await fetchUrl(token, firstDayOfMonth, lastDayOfMonth, pageToken) 
        const items = lastResponse.items
        listOfItems = listOfItems.concat(items)
        pageToken = lastResponse.page_info?.next_page_token
    }
    console.log("response size: "+ listOfItems.length)
    return [listOfItems.flat(), firstDayOfMonth]
}

const getAuthParams = async (req: Request, next : NextFunction): Promise<string> => {
    const request = req.query as any as HotmarRequest
    const token = (await getToken(request, next)).access_token
    return token
}

// Verifica quantos Método Auei foram vendidos no dia
export const getMethodInAMonth = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const [response, firstDayOfMonth] = await getResponse(req, next)
    const methodsSold = SalesUseCase.getMethodsInAMonth(response, firstDayOfMonth)
    res.send(methodsSold)
}

// Verifica quantas ESCOLA FIFA AUEI 2.0 foram vendidos no dia
export const getSchoolInAMonth = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const [response, firstDayOfMonth] = await getResponse(req, next)
    const schoolSold = SalesUseCase.getSchoolInAMonth(response, firstDayOfMonth)
    res.send(schoolSold)
}
