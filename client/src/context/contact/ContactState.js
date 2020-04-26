import React, { useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './ContactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sarah Wilk',
        email: 'sarah@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'sarah@gmail.com',
        phone: '111-111-1111',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispactch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispactch({ type: ADD_CONTACT, payload: contact})
  }

  //Delete Contact
  const deleteContact = id => {
    dispactch({ type: DELETE_CONTACT, payload: id})
  }

  //Set Current COntact
  const setCurrent = contact => {
    dispactch({ type: SET_CURRENT, payload: contact})
  }

  //Clear Current Contact
  const clearCurrent = () => {
    dispactch({ type: CLEAR_CURRENT})
  }

  //Update Contact
  const updateContact = contact => {
    dispactch({ type: UPDATE_CONTACT, payload: contact})
  }

  //Filter Contacts
  const filterContacts = text => {
    dispactch({ type: FILTER_CONTACTS, payload: text})
  }

  //Clear Filter
  const clearFilter = () => {
    dispactch({ type: CLEAR_FILTER});
  }

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      addContact,
      deleteContact,
      updateContact,
      setCurrent,
      clearCurrent,
      filterContacts,
      clearFilter
    }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;
