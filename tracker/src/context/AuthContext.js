import createDataContext from "./createDataContext";

// create reducer
const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// create actions - No actions for now

// create context using createDataContext function
export default { Provider, Context } = createDataContext(
  authReducer,
  {},
  { isSignedIn: false }
);
