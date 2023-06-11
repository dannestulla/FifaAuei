import { HotmartResponse, Item } from "../data/model/hotmart/SalesResponse";

export class SalesUseCase {

  static getSalesInAMonth(items: Item[], firstDayOfMonth: number): number[][] {
    let salesInAMonth: number[] = []
    let salesInADay: number = 0
    let currentDay: number = firstDayOfMonth
    const oneDayMilisec = 86400000

    for (const item of items) {
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

  static transformInTwoDimensions(list: number[]) : number[][] {
    let matrix = []
    for (const sale of list) {
      matrix.push([sale, 0])
    }
    console.log("Lista: "+ list)
    console.log("numeros na lista: "+ list.length)
    return matrix
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

  static getMethodsInAMonth(items: Item[], firstDayOfMonth: number): number[][] {
    let methodInAMonth: number[] = []
    let methodInADay: number = 0
    let currentDay: number = firstDayOfMonth
    const oneDayMilisec = 86400000

    for (const item of items) {
      if (item.purchase.order_date <= (currentDay + oneDayMilisec)) {
        if (item.product.name ==  "MÉTODO AUEI - FIFA AUEI") {
          methodInADay++
        }
      } else {
        currentDay += oneDayMilisec
        methodInAMonth.push(methodInADay)
        methodInADay = 0
      }
    }
    const twoDimensions = this.transformInTwoDimensions(methodInAMonth)
    return twoDimensions
  }

  static getSchoolInAMonth(items: Item[], firstDayOfMonth: number): number[][] {
    let schoolInAMonth: number[] = []
    let schoolInADay: number = 0
    let currentDay: number = firstDayOfMonth
    const oneDayMilisec = 86400000

    for (const item of items) {
      if (item.purchase.order_date <= (currentDay + oneDayMilisec)) {
        if (item.product.name ==  "ESCOLA FIFA AUEI 2.0") {
          schoolInADay++
        }
      } else {
        currentDay += oneDayMilisec
        schoolInAMonth.push(schoolInADay)
        schoolInADay = 0
      }
    }
    const twoDimensions = this.transformInTwoDimensions(schoolInAMonth)
    return twoDimensions
  }
}
