import s from './DeckItem.module.css'
import { useAppDispatch } from '../../../../app/store.ts'
import { deleteDeckTC, updateDeckTC } from '../../decks-thunks.ts'
import { Deck } from '../../decks-api.ts'
import {useState} from "react";
import {set} from "react-hook-form";

type DeckProps = {
  deck: Deck
}

const TEST_ACC_NAME = 'Nik-Kik-Shpink'

export const DeckItem = ({ deck }: DeckProps) => {

   const [isLoading, setIsLoading] = useState(false)
  // const isTestingDeck = deck.author.name === TEST_ACC_NAME
    const isTestingDeck = deck.author?.name.trim().toLowerCase() === TEST_ACC_NAME.toLowerCase();

    const dispatch = useAppDispatch()
    // Функция для удаления колоды
  const handleDeleteButtonClick = async () => {
       setIsLoading(true)// Блокируем кнопку перед запросом
   try {
       await dispatch(deleteDeckTC(deck.id))// Дожидаемся завершения запроса
   }catch(error) {
           console.error("Ошибка при удалении колоды:", error)
   }finally {
       setIsLoading(false)// Разблокируем кнопку в любом случае
   }}

  const handleEditButtonClick = async() => {
       setIsLoading(true)  // Блокируем кнопку перед запросом
      try{
           await   dispatch(updateDeckTC({ id: deck.id, name: `${deck.name} updated` }))
      } catch(error){
          console.error("Ошибка при обновлении колоды:", error)
      } finally {
          setIsLoading(false)// Разблокируем кнопку в любом случае
      }}
    console.log("Deck author:", deck.author?.name);
    console.log("Expected:", TEST_ACC_NAME);
    console.log("Is testing deck:", isTestingDeck);
  return (
    <li className={s.item}>
      <h3 className={s.title}>
        {deck.name}
        {isTestingDeck && '✨'}
      </h3>
      <p className={s.characteristic}>
        <b>Author:</b> {deck.author.name}
      </p>
      <p className={s.characteristic}>
        <b>Created:</b> {new Date(deck.created).toLocaleString('ru-Ru')}
      </p>
      <p className={s.characteristic}>
        <b>Updated:</b> {new Date(deck.updated).toLocaleString('ru-Ru')}
      </p>

      {/*{isTestingDeck && (*/}
        <div className={s.buttonBox}>
          <button onClick={handleEditButtonClick} disabled={isLoading} >update</button>
          <button onClick={handleDeleteButtonClick} disabled = {isLoading}>delete</button>
        </div>
      {/*)}*/}
    </li>
  )
}
