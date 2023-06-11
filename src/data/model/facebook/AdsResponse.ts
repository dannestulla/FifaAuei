export interface FacebookResponse {
    data: Daum[]
    paging?: Paging
  }
  
  export interface Daum {
    spend: string
    date_start: string
    date_stop: string
  }

  export interface Paging {
    cursors?: Cursors
  }

  export interface Cursors {
    after: string
  }
  
