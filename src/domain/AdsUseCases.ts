import moment from "moment";
import { Daum } from "../data/model/facebook/AdsResponse";

export const getOneDay = (date: Date): string => {
    const startDate = moment(date)
    const formatedDate = startDate.format("YYYY-MM-DD")

    return `{since:'${formatedDate}',until:'${formatedDate}'}`
}

export const getAllMonth = (date: Date): string => {
    const today = new Date(date);
    const firstDayOfMonth = moment(new Date(today.setDate(1)).getTime()).format("YYYY-MM-DD")
    const lastDayOfMonth = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format("YYYY-MM-DD")
    return `{since:'${firstDayOfMonth}',until:'${lastDayOfMonth}'}`
}

export const createAdsList = (data: Daum[]) : number[][] => {
    let list = []
    for (const item of data) {
        list.push([parseFloat(item.spend), 0])
    }
    return list
}