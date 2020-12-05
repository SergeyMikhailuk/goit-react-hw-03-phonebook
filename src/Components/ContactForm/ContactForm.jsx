import React from 'react';
import style from "./ContactForm.module.css"

const ContactForm = (props) => {
  const { name, number, handleChange, handleSubmit } = props;
  return (
    <form className={style.phonebook} onSubmit={handleSubmit}>
      <label>
        Name:
          <br />
        <input
          type="name"
          name="name"
          required
          value={name}
          onChange={handleChange}
          className={style.input} />
      </label>
      <label>
        Number:
          <br />
        <input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleChange}
          className={style.input} />
      </label>
      <button
        type="submit"
        className={style.addContactBtn}>Add contact</button>
    </form>
  );
}

export default ContactForm;
