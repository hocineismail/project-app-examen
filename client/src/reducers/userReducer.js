import types from '../types/types'

const initialState = {
  isLoading: true,
  error: false,
  errorMessage: null,
  userData: null   
}

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case types.fetchUserData:
            return {
                isLoading: false,
                error: false,
                errorMessage: null,
                userData: action.payload
            }
        case types.fetchUserDataError:
            return {
                isLoading:false,
                error: true,
                errorMessage: action.payload,
                userData: null
            }
        default: 
            return state
    }
}