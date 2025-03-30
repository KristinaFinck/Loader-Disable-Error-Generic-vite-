import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectDecks } from '../decks-selectors.ts'
import {useLayoutEffect, useState} from 'react'
import { fetchDecksTC } from '../decks-thunks.ts'
import {set} from "react-hook-form";


export const useFetchDecks = () => {
  const dispatch = useAppDispatch() // get Redux dispatch function
  const decks = useAppSelector(selectDecks)  // get decks array from Redux store
 const [isLoading, setIsLoading] = useState(true)  // local loading state

  useLayoutEffect(() => {
    setIsLoading(true)  // show loader while fetching
    dispatch(fetchDecksTC()).finally(() => { // dispatch thunk to fetch decks from API
      setIsLoading(false) // hide loader when done (success or error)
    })
  }, [dispatch])

  return {
    decks,       // array of decks from store
    isLoading       // loading flag for UI
  }
}
