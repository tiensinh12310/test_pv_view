import React from "react";

var LayoutStateContext = React.createContext();
var LayoutDispatchContext = React.createContext();

function layoutReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      if (state.isSidebarOpened) {
        document.body.classList.remove("sideBarOpened")
      } else {
        document.body.classList.add("sideBarOpened")
      }
      return {...state, isSidebarOpened: !state.isSidebarOpened};
    case "OPEN_SIDEBAR":
      document.body.classList.add("sideBarOpened")
      return {...state, isSidebarOpened: true}
    case "CLOSE_SIDEBAR":
      document.body.classList.remove("sideBarOpened")
      return {...state, isSidebarOpened: false}
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LayoutProvider({children}) {
  var [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: false,
  });
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  var context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  var context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export {LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar, closeSidebar, openSidebar};

// ###########################################################
function toggleSidebar(dispatch) {
  dispatch({
    type: "TOGGLE_SIDEBAR",
  });
}

function closeSidebar(dispatch) {
  dispatch({
    type: "CLOSE_SIDEBAR",
  });
}

function openSidebar(dispatch) {
  dispatch({
    type: "OPEN_SIDEBAR",
  });
}

