import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectDecks } from '../decks-selectors.ts'
import { useEffect } from 'react'
import { fetchDecksTC } from '../decks-thunks.ts'

export const useFetchDecks = () => {
  const dispatch = useAppDispatch()
  const decks = useAppSelector(selectDecks)

  useEffect(() => {
    console.log("Fetching decks..."); // Проверяем, вызывается ли useEffect
    dispatch(fetchDecksTC())
  }, [dispatch])

  return {
    decks,
  }
}
