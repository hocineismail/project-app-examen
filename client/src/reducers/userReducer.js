import types from '../types/types'

const initialState = {
  isLoading: true,
  error: false,
  errorMessage: null,
  userData: null,
  studentModules: null,
  studentModulesError: null,
  studentExams: null,
  studentExamsError: null,
  examInformations: null,
  examInformationsError: null
}

export default function userReducer(state = initialState, action) {
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
        isLoading: false,
        error: true,
        errorMessage: action.payload,
        userData: null
      }
    case types.fetchStudentModules:
      return {
        ...state,
        studentModules: action.payload,
        studentModulesError: null
      }
    case types.fetchStudentModulesError:
      return {
        ...state,
        studentModules: null,
        studentModulesError: action.payload
      }
    case types.fetchStudentExams:
      return {
        ...state,
        studentExams: action.payload,
        studentExamsError: null
      }
    case types.fetchStudentExamsError:
      return {
        ...state,
        studentExamsError: action.payload,
        studentExams: null
      }
    case types.fetchExamInformation:
      console.log(action.payload)
      return {
        ...state,
        examInformations: action.payload,
        examInformationsError: null
      }
    case types.fetchExamInformationError:
      return {
        ...state,
        examInformationsError: action.payload,
        examInformations: null
      }
    default:
      return state
  }
}
