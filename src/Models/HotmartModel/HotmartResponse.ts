export interface HotmartResponse {
    items: Item[]
  }
  
  export interface Item {
    purchase: Purchase
  }

  interface Purchase {
    payment: Payment
    hotmart_fee: HotmartFee
    recurrency_number: number
    order_date: number
    price: Price
  }
  
  interface Payment {
    installments_number: number
  }
  
  interface HotmartFee {
    currency_code: string
    fixed: number
    total: number
    base: number
  }
  
  interface Price {
    currency_code: string
    value: number
  }
  