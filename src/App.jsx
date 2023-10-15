import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import FilterByName from 'components/FilterByName/FilterByName';
import ContactList from 'components/ContactList/ContactList';
import { PhoneCard, Title, TitleMain } from 'AppStyled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [formData, setFormData] = useState({
    contacts: [],
    filter: '',
  });

  useEffect(() => {
    const storedContacts = JSON.parse(window.localStorage.getItem('Contacts'));
    if (storedContacts) {
      setFormData(prevData => ({ ...prevData, contacts: storedContacts }));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Contacts', JSON.stringify(formData.contacts));
  }, [formData.contacts]);

  const handleOnInput = eve => {
    setFormData({ ...formData, [eve.target.name]: eve.target.value });
  };

  const handleAddContact = ({ name, number }) => {
    const contactInList = formData.contacts.some(
      contact => contact.number === number
    );

    if (name && number) {
      if (!contactInList) {
        setFormData(prev => ({
          ...prev,
          contacts: [...prev.contacts, { id: nanoid(), name, number }],
        }));
        toast.success(`${name} was added to contacts`);
      } else {
        toast.error(`${name} is already exist in contacts`);
      }
    }
  };

  const handleDelContact = id => {
    setFormData(prev => ({
      ...prev,
      contacts: [...prev.contacts.filter(contact => contact.id !== id)],
    }));
  };

  const filterOfContacts = () => {
    if (formData.filter.trim() === '') {
      return formData.contacts;
    }
    return formData.contacts.filter(contact =>
      contact.name.toLowerCase().includes(formData.filter.toLowerCase())
    );
  };

  const { contacts, filter } = formData;
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
