import React, { Component } from 'react';
import Notiflix from 'notiflix';

import ContactForm, { ContactsInitialValues } from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import { Wrapper } from './App.styled';
import {getContactsFromStorage, setContactsToStorage} from "utils/localStorage";

class App extends Component<{}, AppState> {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = getContactsFromStorage();
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState: AppState) {
    if (this.state.contacts !== prevState.contacts) {
      setContactsToStorage(this.state.contacts);
    }
  }

  onSubmitForm = (values: ContactsInitialValues) => {
    const { name } = values;
    const existName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existName) {
      return Notiflix.Notify.failure(`${name} is already in contacts.`);
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, values] };
    });
  };

  onContactDelete = (id: string) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const contactToLowerCase = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactToLowerCase)
    );
  };

  render() {
    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.onSubmitForm} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilterList={this.onFilterList} />
        <ContactList
          getContacts={this.getFilteredContacts}
          onContactDelete={this.onContactDelete}
        />
      </Wrapper>
    );
  }
}

export default App;

export type AppState = {
  contacts: ContactsInitialValues[];
  filter: string;
};
