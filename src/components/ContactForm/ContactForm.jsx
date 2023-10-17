import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonForm, Form, Input, LabelForm } from './ContactFormStyled';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleOnInput = eve => {
    switch (eve.target.name) {
      case 'name':
        setName(eve.target.value);
        break;
      case 'number':
        setNumber(eve.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = eve => {
    eve.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <LabelForm htmlFor="name">
          Name
          <Input
            id="name"
            type="text"
            name="name"
            pattern="^[\p{L}' ]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleOnInput}
            value={name}
          />
        </LabelForm>
        <LabelForm htmlFor="number">
          Number
          <Input
            id="number"
            type="tel"
            name="number"
            pattern="^\+380\d{9}$"
            title="Phone number must be like +380*********"
            placeholder="+38**********"
            required
            onChange={handleOnInput}
            value={number}
          />
        </LabelForm>
        <ButtonForm type="submit">Add contact</ButtonForm>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
