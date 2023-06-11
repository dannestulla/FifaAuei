export interface HotmartResponse {
    items: Item[]
    page_info?: PageInfo
  }

  export interface PageInfo {
    results_per_page: number,
    total_results: number,
    next_page_token: string
  }
  
  export interface Item {
    purchase: Purchase
    product: Product
  }

  export interface Purchase {
    payment: Payment
    hotmart_fee: HotmartFee
    recurrency_number: number
    order_date: number
    price: Price
  }

  interface Product {
    name: string
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
  