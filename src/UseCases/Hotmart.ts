import { HotmartResponse, Item } from "../Models/HotmartModel/HotmartResponse";

export class HotmartUseCase {
  static comissionCalc = (items: Item[]) => {
    var sum = 0
    items.map((item: Item) => {
      // taxa da parcela
      var installmentsTax = 0.0289

      // taxa da hotmart                                    
      var hotmartTax = 0.099

      // numero de parcelas
      var installmentsNumber = item.purchase.payment.installments_number

      // total pago com juros do cartao    
      var amountPaid = item.purchase.price.value

      // indicador da taxa de servico
      var serviceTax = item.purchase.recurrency_number
      var serviceValue

      if (serviceTax == 1) {
        serviceValue = 2.49
      } else {
        serviceValue = 0.5
      }

      if (installmentsNumber > 1) {
        var installmentValue = amountPaid / installmentsNumber
        var upperPart = ((Math.pow((1 + installmentsTax), installmentsNumber) * installmentsTax))
        var lowerPart = ((Math.pow((1 + installmentsTax), installmentsNumber) - 1))
        var amountWithoutInterest = installmentValue / (upperPart / lowerPart)
        var cu = 0
      } else {
        amountWithoutInterest = amountPaid
      }

      var hotmartValue = (hotmartTax * amountWithoutInterest) + 1
      var comissionValue = amountWithoutInterest - hotmartValue - serviceValue

      sum += comissionValue
    });

    return sum.toFixed(2).replace(".", ",")
  }

  static getCurrentDayMilisec(date: Date) {
    //date.setHours(0, 0, 0, 0)
    var startDateMilisec = date.valueOf()
    const oneDayMilisec = 86400000
    var endDateMilisec = startDateMilisec + oneDayMilisec
    return [startDateMilisec, endDateMilisec]
  }

  static isForeignCurrency = (items: Item[]): boolean => {
    let isForeign = false
     for (const itemSelected in items) {
      const itemTyped = (itemSelected as unknown) as Item
      if (itemTyped.purchase.price.currency_code != "BRL") {
        isForeign = true
      }
    } 
    return isForeign
  }
}
