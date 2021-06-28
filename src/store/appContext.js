import { createContext } from 'react';

const AppContext = createContext({
  loggedIn: false,
  user: {},
  notes: [],
  setnotes: null,
  notebooks: [],
  setnotebooks: null,
  categoriesTable: [],
  setcategoriesTable: null,
});

export default AppContext;
