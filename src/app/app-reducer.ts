export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'CHANGE-STATUS':
      return {...state, status: action.status} // store change here
    case 'SET-ERROR':
      return { ...state, error: action.error } // or here
default:
  return state
}}
  export const setAppStatusAC = (status: RequestStatusType ) => {
    return{
      type: 'CHANGE-STATUS' as const,
      status
    }
  }
export const setAppErrorAC = (error: string | null) => ({
  type: 'SET-ERROR' as const,
  error,
})

  type ActionsType =
      | ReturnType<typeof setAppStatusAC>
      | ReturnType<typeof setAppErrorAC>

