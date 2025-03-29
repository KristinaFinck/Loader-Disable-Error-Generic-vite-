import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import {useAppDispatch, useAppSelector} from "../store.ts";
import {setAppErrorAC} from "../app-reducer.ts";

export const GlobalError = () => {
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('ERROR:', error) // отладка
    if (error) {
      toast.error(error)

      // таймаут нужен, чтобы дать toast'у отрендериться
      setTimeout(() => {
        dispatch(setAppErrorAC(null))
      }, 100)
    }
  }, [error, dispatch])

  return <ToastContainer theme="dark" autoClose={3000} />
}
// 1. Thunk dispatches an action
// 2. Reducer receives the action
// 3. Reducer returns the new state
// 4. Redux updates the store
// 5. Component gets the updated value via useSelector
// 6. useEffect reacts and triggers a side effect (e.g. show error modal)