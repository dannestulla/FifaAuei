import { Request, Response, NextFunction } from 'express';
import { HotmarRequest } from '../../data/model/hotmart/HotmarRequest';
import { HotmartUseCase } from "../../domain/HotmartUseCases";
import { getToken, fetchUrl } from '../../data/repository/HotmartRepository';

export const getSalesInAMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await getAuthParams(req, next)
    const  [firstDayOfMonth, lastDayOfMonth] = HotmartUseCase.getMonthStart((req.query as any as HotmarRequest).date)
    const response = await fetchUrl(token, firstDayOfMonth, lastDayOfMonth)
    const listOfSales = HotmartUseCase.getSalesInAMonth(response, firstDayOfMonth)
    res.send(listOfSales)
}

export const getSalesInADay = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await getAuthParams(req, next)
    const [dayStart, dayEnd] = HotmartUseCase.getDayDuration((req.query as any as HotmarRequest).date)
    const response = await fetchUrl(token, dayStart, dayEnd)
    if (HotmartUseCase.isForeignCurrency(response.items)) {
        res.send("Faça o cálculo manualmente")
        return
    }
    let daySales = 0
    for (const item of response.items) {
        daySales += HotmartUseCase.getComission(item)
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
    const [dayStart, dayEnd] = HotmartUseCase.getDayDuration((req.query as any as HotmarRequest).date)
    const response = await fetchUrl(token, dayStart, dayEnd)
    const methodsSold = HotmartUseCase.getMethodSold(response.items)
    res.send(methodsSold)
}

// Verifica quantas ESCOLA FIFA AUEI 2.0 foram vendidos no dia
export const getSchool = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await getAuthParams(req, next)
    const [dayStart, dayEnd] = HotmartUseCase.getDayDuration((req as any as HotmarRequest).date)
    const response = await fetchUrl(token, dayStart, dayEnd)
    const schoolsSold = HotmartUseCase.getSchoolsSold(response.items)
    res.send(schoolsSold)
}
