

export  interface Operation {
    id?:number
    bank_account_id?:number
    amount:number
    operation_date :Date
    operation_type :string
    recurring :boolean
    payment_mode?:string
    increment_and_decrement:boolean
    category_id?:number
    category?:{id:number,name:string}| undefined
    bank_account?:{id:number,name:string}

}

 export  interface PaymentMode {
     name :string

 }
 export  interface OperationType {
     name :string

 }

 export  interface Category {
     name :string
     id?:number
     user_name?:string

 }

 export  interface BankAccount {
    id?:number
     name :string
     initial_budget : number
     actual_budget_of_this_month : number
     final_budget_of_this_month : number
     account_color?:string
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

