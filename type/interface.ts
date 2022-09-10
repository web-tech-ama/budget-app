

export  interface Operation {
    operationDate :Date
    type :string
    recurring :boolean

}

 export  interface PaymentMode {
     name :string

 }
 export  interface OperationType {
     name :string

 }

 export  interface Category {
     name :string

 }

 export  interface BankAccount {
    id?:number
     name :string
     initial_budget : number
     actual_budget_of_this_month : number
     final_budget_of_this_month : number
     user_id? : string

 }

export  interface Transfer{
    formAccount :string
    toAccount : string
    amount : number
    transferDate :Date


}
export  interface TransferType {
    name :string

}
export interface Userinfo{
    firstname :string
    lastname :string
    age :Date,
    email: string
    user_id? :string
}

