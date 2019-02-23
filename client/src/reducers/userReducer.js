import types from '../types/types'

const initialState = {
  isLoading: true,
  error: false,
  errorMessage: null,
  userData: null,
  studentModules : null,
  studentModulesError : null
}

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case types.fetchUserData:
            return {
                ...state,
                isLoading: false,
                error: false,
                errorMessage: null,
                userData: action.payload
            }
        case types.fetchUserDataError:
            return {
                ...state,
                isLoading:false,
                error: true,
                errorMessage: action.payload,
                userData: null
            }
        case types.fetchStudentModules:
            return {
                ...state,
                studentModules : action.payload,
                studentModulesError : null
            }
        case types.fetchStudentModulesError:
            return {
                ...state,
                studentModules: null,
                studentModulesError: action.payload
            }
        default: 
            return state
    }
}