import React from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import FilterByName from 'components/FilterByName/FilterByName';
import ContactList from 'components/ContactList/ContactList';
import { PhoneCard, Title, TitleMain } from 'AppStyled';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteContact, setContacts, setFilter } from 'redux/phonebookReducers';

export const App = () => {
  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);

  const dispatch = useDispatch();

  const handleOnInput = eve => {
    dispatch(setFilter(eve.target.value));
  };

  const handleAddContact = ({ name, number }) => {
    const contactInList = contacts.some(contact => contact.number === number);

    if (name && number) {
      if (!contactInList) {
        dispatch(setContacts({ id: nanoid(), name, number }));
        toast.success(`${name} was added to contacts`);
      } else {
        toast.error(`${name} is already exist in contacts`);
      }
    }
  };

  const handleDelContact = id => {
    dispatch(deleteContact(id));
  };

  const filterOfContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filterData = filterOfContacts();
  return (
    <PhoneCard>
      <TitleMain>Phone book</TitleMain>
      <ContactForm addContact={handleAddContact} />
      {contacts.length ? (
        <>
          <Title>Contacts</Title>
          <FilterByName onFilterChange={handleOnInput} filterValue={filter} />
          <ContactList
            contacts={filterData}
            filterValue={filter}
            deleteContact={handleDelContact}
          />
        </>
      ) : (
        'There are no contacts'
      )}
    </PhoneCard>
  );
};
