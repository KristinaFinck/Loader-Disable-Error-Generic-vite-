import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer.ts";
import {AppDispatch} from "../../app/store.ts";
import axios, {isAxiosError} from "axios";

export const fetchDecksTC = () => async(dispatch: AppDispatch) => {
  try {
    // Перед отправкой запроса устанавливаем статус "loading"
  dispatch(setAppStatusAC('loading'))
    // Дожидаемся ответа от API
    const res = await decksAPI.fetchDecks()
    console.log("Decks fetched:", res.data.items); // Проверяем API-ответ
    // Когда данные пришли, обновляем store
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
} catch (error) {
    console.error("Ошибка при загрузке колоды:", error); // Логируем ошибку
    dispatch(setAppStatusAC('failed'))
  }
}
export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}
// Case 1: Errors on the backend side (server-side errors).
// The error is generated by Axios and `e.response.data` contains the server's response.
//  Case 2: network error = axios создаёт объект ошибки, сообщение можно взять из поля e.message
// Case 3: Js error
export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try{
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data)) // обновили store
    // throw new Error("Boom!")  // 💥 Ошибка
  }
  catch(e){
    console.log(e)
     let errorMessage: string = ''
    console.log("📍 Location error: updateDeckTC")
    if(isAxiosError(e)) {
      //case 1 case 2
      errorMessage = e.response?
          e.response?.data?.errorMessages?.[0].message || e.message//case 1, ошибка с сервера
       : e.message //case 2, ceть, например, offline
    }else {
      //case 3, js error
      errorMessage = (e as Error).message
    } // вынесла dispatch из блока if!
      console.log('❌ Error while updating deck:', errorMessage)
      dispatch(setAppErrorAC(errorMessage))

  }
}
type ServerError = {
  errorMessages: Array<{
    field: string
    message: string
  }>
}
