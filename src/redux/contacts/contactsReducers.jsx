import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import contactsActions from "./contactsActions";

const addContact = (state, action) => {
  return state
    .map((contact) => contact.name)
    .includes(action.payload.contact.name) ||
    // =============================================
    // PREVENT SAVING SAME CONTACT OR IF EMPTY FIELD
    // =============================================
    action.payload.contact.name === "" ||
    action.payload.contact.number === ""
    ? state
    : [...state, action.payload.contact];
};

const removeContact = (state, action) => {
  return state.filter((contact) => contact.id !== action.payload);
};

// =============================================
// ======      CONTACTS REDUCER    ============
// =============================================
const contactReducer = createReducer([], {
  [contactsActions.addContact]: addContact,
  [contactsActions.removeContact]: removeContact,
});

// =============================================
// ======      FILTER REDUCER    ============
// =============================================
const filterReducer = createReducer("", {
  [contactsActions.changeFilter]: (_, action) => action.payload,
});

export default combineReducers({
  contacts: contactReducer,
  filter: filterReducer,
});
