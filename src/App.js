import {legacy_createStore as createStore} from 'redux';
import {reducer} from './reducer'
import {Provider} from "react-redux";
import ListItem from "./views/ListItem";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const store = createStore(reducer);

    return (
        <Provider store={store}>
            <ListItem/>
        </Provider>
    );
}

export default App;
