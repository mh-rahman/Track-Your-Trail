import React, { useReducer } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const actionsWithDispatch = {};

    for (let key in actions) {
      actionsWithDispatch[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...actionsWithDispatch }}>
        {children}
      </Context.Provider>
    );
  };

  // Provider will make our data available to everything inside our application
  // Context is the object we will use to get access to that data from child components
  return { Provider, Context };
};
