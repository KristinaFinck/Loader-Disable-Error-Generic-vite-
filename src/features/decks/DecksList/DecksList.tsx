import s from './DecksList.module.css'
import { DeckItem } from './DeckItem/DeckItem.tsx'
import { useFetchDecks } from './useFetchDecks.ts'
import Skeleton from "react-loading-skeleton";
import {DeckItemSkeleton} from "./DeckItem/DeckItemSkeleton.tsx";

export const DecksList = () => {
  const { decks, isLoading } = useFetchDecks()   // use custom hook to fetch decks

  return (
      <>
    <ul className={s.list}>
      {isLoading && decks.length === 0 && <DeckItemSkeleton count = {10}/>}
      {/*show skeleton while loading*/}
      {decks.map((deck) => (
          // render each deck as a list item
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </ul>

      </>)
}
