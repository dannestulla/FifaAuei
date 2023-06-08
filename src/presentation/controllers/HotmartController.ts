import { Request, Response, NextFunction } from 'express';
import { HotmarRequest } from '../../data/model/hotmart/HotmarRequest';
import { HotmartUseCase } from "../../domain/HotmartUseCase";
import { getToken, fetchUrl } from '../../data/repository/HotmartRepository';

export const getSales = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const [token, dayStart, dayEnd] = await getAuthParams(req, next)
    const response = await fetchUrl(token, dayStart, dayEnd)
    if (HotmartUseCase.isForeignCurrency(response.items)) {
        res.send("Faça o cálculo manualmente")
        return
    }
    const total = HotmartUseCase.comissionCalc(response.items)
    res.send(total)
};

export const getAuthParams = async (req: Request, next : NextFunction): Promise<[string, number, number]> => {
    const request = req.query as any as HotmarRequest
    const token = (await getToken(request, next)).access_token
    const date = new Date(request.date)
    const day = HotmartUseCase.getCurrentDayMilisec(date)
    return [token, day[0], day[1]]
}

// Verifica quantos Método Auei foram vendidos no dia
export const getMethod = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const [token, dayStart, dayEnd] = await getAuthParams(req, next)
    const response = await fetchUrl(token, dayStart, dayEnd)
    const methodsSold = HotmartUseCase.getMethodSold(response.items)
    res.status(200).send(methodsSold)
}

// Verifica quantas ESCOLA FIFA AUEI 2.0 foram vendidos no dia
export const getSchool = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const [token, dayStart, dayEnd] = await getAuthParams(req, next)
    const response = await fetchUrl(token, dayStart, dayEnd)
    const schoolsSold = HotmartUseCase.getSchoolsSold(response.items)
    res.status(200).send(schoolsSold)
}
