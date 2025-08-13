import React from 'react';
import { Provider } from 'react-redux';
import  { store } from './api/store';
import { PokemonApp } from './components/PokemonApp';



const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PokemonApp />
    </Provider>
  );
};

export default App;