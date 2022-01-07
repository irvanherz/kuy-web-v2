import { combineReducers } from "redux";

import organizer from './organizer'
import tomtom from './tomtom'
import auth from './auth'
import snackbar from './snackbar'
import trip from './trip'
import media from './media'

const rootReducer = combineReducers({
  auth,
  organizer,
  tomtom,
  snackbar,
  trip,
  media,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
