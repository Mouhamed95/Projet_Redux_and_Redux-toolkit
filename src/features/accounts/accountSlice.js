import { createSlice } from "@reduxjs/toolkit";



const initialState={
    balance:0,
    loan:0,
    loanPurpose: "",
    isLoading: false
};

const accountSlice = createSlice({
    name:"account",
    initialState:initialState,
    reducers:{
        deposit(state,action){
            state.balance += action.payload
        },
        withdraw(state,action){
            state.balance -= action.payload
        },
        requestLoan : {
           prepare(amount,purpose){
            return{
                payload:{amount,purpose}
            }
           },

           reducer (state,action){
                if(state.loan > 0) return;
                state.loan = action.payload.amount
                state.balance += action.payload.amount
                state.loanPurpose = action.payload.purpose
        } 
        },
        payload(state,action){
            state.balance -= state.loan
            state.loan = 0
            state.loanPurpose = ""
            
        }
    }
})
console.log(accountSlice)

export const {deposit,withdraw, requestLoan, payload} = accountSlice.actions

export default accountSlice.reducer

// export default  function accountReducer(state= initialState, action){
//     switch(action.type){
//     case "account/deposit":
//       return{
//           ...state, 
//           balance: state.balance + action.payload,
//           isLoading:false
//       };
//       case "account/withdraw":
//           return{
//               ...state,
//               balance: state.balance - action.payload
//           };  
  
//       case "account/requestLoan":
//           if(state.loan > 0) return state
//           return {
//               ...state, 
//               loan: action.payload.amount,
//               balance: state.balance + action.payload.amount,
//               loanPurpose: action.payload.purpose
//           }  
//       case "account/payloan":
//           return {
//               ...state,
//               loan:0, 
//               loanPurpose: "",
//               balance: state.balance - state.loan
//           }   
//           case "account/convertingCurrency":
//             return{
//                 ...state,
//                 isLoading:true
//             }
//           default:
//           return state;
//       }      
//   }



//  export function deposit(amount,currency){
//     if(currency === "USD") return {type: "account/deposit", payload: amount}

//     return  async function(dispatch, getState){
//         dispatch({type:"account/convertingCurrency"})
//       //API call
//         const res = await  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//         const data = await res.json()
//         const converted = data.rates.USD

//         dispatch({type: "account/deposit", payload: converted}) 
//     }
// }

// export function withdraw(amount){
//     return {type:"account/withdraw", payload: amount}
// }



// export function requestLoan(amount,purpose){
//   return  {type:"account/requestLoan", payload:{
//         amount,
//         purpose
//     }}
// }


// export function payload(){
//     return {type:"account/payloan"}
// }

// store.dispatch(requestLoan(1000, "buy a care"))
// console.log(store.getState())

// store.dispatch(payload())
// console.log(store.getState())