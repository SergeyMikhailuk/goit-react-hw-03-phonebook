import React, { Component } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactsList from "./Components/ContactsList/ContactsList";
import Filter from "./Components/Filter/Filter";

const INITIAL_STATE = {
  name: "",
  number: "",
  filter: "",
};

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const contactsParse = JSON.parse(contacts);
    if (contactsParse) {
      this.setState({ contacts: contactsParse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.checkCollision()) return;
    const { name, number } = this.state;
    const id = uuid();
    this.setState((prev) => ({
      contacts: [...prev.contacts, { id, name, number }],
    }));
  };

  checkCollision = () => {
    const { name, contacts } = this.state;
    const allNames = contacts.map((contact) => contact.name);
    const collision = allNames.find(
      (el) => el.toLowerCase() === name.toLowerCase()
    );
    if (collision) {
      console.log(collision);
      alert(collision + "is alredy in contacts");
      return true;
    }
    this.reset();
  };

  handlerFilter = ({ target }) => {
    console.log(target.value);
    this.setState({ filter: target.value });
  };

  remove = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { contacts, name, number, filter } = this.state;
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <Filter filterValue={filter} handlerFilter={this.handlerFilter} />
        <ContactsList
          contacts={contacts}
          filter={filter}
          remove={this.remove}
        />
      </div>
    );
  }
}

export default App;
