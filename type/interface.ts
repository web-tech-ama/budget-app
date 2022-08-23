

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
     name :string
     initialBudget : number
     actualBudget : number
     finalBudget : number

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

