import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import {LinearLoader} from "../common/components/Loader/LinearLoader.tsx";
import {useSelector} from "react-redux";
import {AppRootState, useAppSelector} from "./store.ts";

export const App = () => {
const status = useAppSelector((state) => state.app.status)
  return (
    <div>
        {status === 'loading' && < LinearLoader/>}
      <Decks />
      <GlobalError />
    </div>
  )
}
