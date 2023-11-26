import { ContactsInitialValues } from 'components/ContactForm';

export function getContactsFromStorage(): ContactsInitialValues[] | null {
  const contacts = localStorage.getItem('contacts');

  if (contacts) {
    return JSON.parse(contacts) as ContactsInitialValues[];
  } else {
    return null;
  }
}

export function setContactsToStorage(contacts: ContactsInitialValues[]) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}
