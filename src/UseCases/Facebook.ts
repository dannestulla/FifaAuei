import moment from "moment";

export const createDate = (date: Date) : string => {
    const startDate = moment(date)
    const formatedDate = startDate.format("YYYY-MM-DD")

    return `{since:'${formatedDate}',until:'${formatedDate}'}`
}