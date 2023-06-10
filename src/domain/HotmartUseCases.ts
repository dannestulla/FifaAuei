import { HotmartResponse, Item } from "../data/model/hotmart/HotmartResponse";

export class HotmartUseCase {

  static getSalesInAMonth(response: HotmartResponse, firstDayOfMonth: number): string[][] {
    let salesInAMonth: number[] = []
    let salesInADay: number = 0
    let currentDay: number = firstDayOfMonth
    const oneDayMilisec = 86400000

    for (const item of response.items) {
      if (item.purchase.order_date <= (currentDay + oneDayMilisec)) {
        salesInADay += this.getComission(item)
      } else {
        currentDay += oneDayMilisec
        salesInAMonth.push(salesInADay)
        salesInADay = 0
        salesInADay += this.getComission(item)
      }
    }
    const twoDimensions = this.transformInTwoDimensions(salesInAMonth)
    return twoDimensions
  }

  static transformInTwoDimensions(salesInAMonth: number[]) {
    let list = []
    for (const sale of salesInAMonth) {
      list.push([sale.toFixed(2), ""])
    }
    console.log("Lista: "+ list)
    console.log("numeros na lista: "+ list.length)
    return list
  }

  static getComission = (item: Item): number => {
    // taxa da parcela
    let installmentsTax = 0.0289

    // taxa da hotmart                                    
    let hotmartTax = 0.099

    // numero de parcelas
    let installmentsNumber = item.purchase.payment.installments_number

    // total pago com juros do cartao    
    let amountPaid = item.purchase.price.value

    // indicador da taxa de servico
    let serviceTax = item.purchase.recurrency_number
    let serviceValue

    if (serviceTax == 1) {
      serviceValue = 2.49
    } else {
      serviceValue = 0.5
    }

    if (installmentsNumber > 1) {
      let installmentValue = amountPaid / installmentsNumber
      let upperPart = ((Math.pow((1 + installmentsTax), installmentsNumber) * installmentsTax))
      let lowerPart = ((Math.pow((1 + installmentsTax), installmentsNumber) - 1))
      var amountWithoutInterest = installmentValue / (upperPart / lowerPart)

    } else {
      amountWithoutInterest = amountPaid
    }

    let hotmartValue = (hotmartTax * amountWithoutInterest) + 1
    let comissionValue = amountWithoutInterest - hotmartValue - serviceValue

    //    return comissionValue.toFixed(2).replace(".", ",")
    return comissionValue
  }

  static getMonthStart(date: Date): [number, number] {
    const today = new Date(date);
    const firstDayOfMonth = (new Date(today.setDate(1)).getTime())
    const lastDayOfMonth = (new Date(today.getFullYear(), today.getMonth() + 1, 0)).getTime();
    return [firstDayOfMonth, lastDayOfMonth]
  }

  static getDayDuration(date: Date) {
    const startDate = new Date(date)
    var startDateMilisec = startDate.valueOf()
    const oneDayMilisec = 86400000
    var endDateMilisec = startDateMilisec + oneDayMilisec
    return [startDateMilisec, endDateMilisec]
  }

  static isForeignCurrency = (items: Item[]): boolean => {
    let isForeign = false
    for (const itemSelected of items) {
      if (itemSelected.purchase.price.currency_code != "BRL") {
        isForeign = true
      }
    }
    return isForeign
  }

  static getMethodSold = (items: Item[]): string => {
    let methodSold = 0
    for (const itemSelected of items) {
      if (itemSelected.product.name == "MÉTODO AUEI - FIFA AUEI") {
        methodSold++
      }
    }
    if (methodSold == 0) {
      return ""
    } else {
      return methodSold.toString()
    }
  }

  static getSchoolsSold = (items: Item[]): string => {
    let schoolsSold = 0
    for (const itemSelected of items) {
      if (itemSelected.product.name == "ESCOLA FIFA AUEI 2.0") {
        schoolsSold++
      }
    }
    if (schoolsSold == 0) {
      return ""
    } else {
      return schoolsSold.toString()
    }
  }
}
