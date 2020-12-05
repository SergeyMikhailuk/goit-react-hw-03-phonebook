import React, { Component } from 'react';
import style from "./ContactsList.module.css"

class ContactsList extends Component {
  filterByName = ({ name }) => {
    const nameLower = name.toLowerCase();
    const filter = this.props.filter.toLowerCase();
    return nameLower.includes(filter);
  }
  render() {
    const { contacts, remove } = this.props;
    return (
      <ul className={style.list}>
        {contacts &&
          contacts.filter(contact => this.filterByName(contact)).map(contact => {
            return (
              <li key={contact.id} className={style.listItem}>
                {contact.name + " " + contact.number}
                < button className={style.button} onClick={() => { remove(contact.id) }}> Delete</button>
              </li>)
          })
        }
      </ul >);
  }
}

export default ContactsList;