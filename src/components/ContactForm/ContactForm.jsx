import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonForm, Form, Input, LabelForm } from './ContactFormStyled';

export const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleOnInput = eve => {
    setFormData({ ...formData, [eve.target.name]: eve.target.value });
  };

  const onSubmit = eve => {
    const { name, number } = formData;
    eve.preventDefault();
    addContact({ name, number });
    setFormData({ name: '', number: '' });
  };

  const { name, number } = formData;
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
