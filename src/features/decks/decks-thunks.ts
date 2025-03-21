import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import {setAppStatusAC} from "../../app/app-reducer.ts";
import {AppDispatch} from "../../app/store.ts";

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

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  return decksAPI.updateDeck(params).then((res) => {
    dispatch(updateDeckAC(res.data))
  })
}
