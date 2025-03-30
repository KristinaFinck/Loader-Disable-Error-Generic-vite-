import s from './DecksList.module.css'
import { DeckItem } from './DeckItem/DeckItem.tsx'
import { useFetchDecks } from './useFetchDecks.ts'
import Skeleton from "react-loading-skeleton";

export const DecksList = () => {
  const { decks, isLoading } = useFetchDecks()   // use custom hook to fetch decks

  return (
      <>
        <Skeleton height={100} count = {10} />
        {isLoading && <Skeleton />}
        {/*show skeleton while loading*/}
    <ul className={s.list}>
      {decks.map((deck) => (
          // render each deck as a list item
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </ul>

      </>)
}
