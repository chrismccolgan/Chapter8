import React, { useState, useRef } from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css';

const AddUser = (props) => {
  // Experimenting using useRef instead of state for form values
  const nameInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      return setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
    }
    if (+enteredAge < 1) {
      return setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (greater than 0).',
      });
    }

    // Lifting state up to App.js
    props.onAddUser(enteredName, enteredAge);

    // setEnteredUsername('');
    nameInputRef.current.value = '';

    setEnteredAge('');
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor='age'>Age (Years)</label>
          <input
            type='number'
            id='age'
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
