import './App.css';
import moment from 'moment-timezone';
import Router from './Router';
import SnackbarHandler from './components/snackbar-handler';
import SnackbarProvider from 'components/snackbar/snackbar-provider';
import 'moment/locale/id';

function App() {
  moment.locale('id')
  return (
    <>
      <div id='app-root'>
        <SnackbarProvider 
          containerClassName='z-100 fixed top-0 left-1/2 transform -translate-x-1/2' 
          containerStyle={{ top: 70 }}
        >
          <Router />
        </SnackbarProvider>
      </div>
      <div id='modal-root'></div>
      <div id='snackbar-root'></div>
      <SnackbarHandler />
    </>
  )
}

export default App