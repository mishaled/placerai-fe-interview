import {FormEvent, useCallback, useMemo, useState} from 'react';
import {Button} from '@mui/material';
import styled from 'styled-components';
import {City, State} from './types';
import StateAutocompleteComponent from './components/StateAutocompleteComponent';
import CityAutocompleteComponent from './components/CityAutocompleteComponent';
import submitRequest from './submitRequest';
import EmailInputComponent from './components/EmailInputComponent';
import SimpleTextField from './components/SimpleTextField';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const StyledSubmitButton = styled(Button)`
    margin-top: 30px;
`;

const SignUpForm = () => {
    const [chosenState, setChosenState] = useState<State | undefined>();
    const [chosenCity, setChosenCity] = useState<City | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [lastName, setLastName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const [showErrors, setShowErrors] = useState<boolean>(false);

    const onSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault();
            console.log('isform', {
                isFormValid,
                name,
                lastName,
                email,
                password,
                chosenCity,
                chosenState,
            });
            if (!isFormValid) {
                setShowErrors(true);
                return;
            }

            submitRequest({
                firstName: name!,
                lastName: lastName!,
                country: chosenState!.state_name,
                city: chosenCity!.city_name,
                email: email!,
                password: password!,
            });
        },
        [name, lastName, email, password, chosenCity, chosenState],
    );

    const isFormValid = useMemo(
        () => !!name && !!lastName && !!email && !!password && !!chosenCity && !!chosenState,
        [name, lastName, email, password, chosenCity, chosenState],
    );

    return (
        <Form onSubmit={onSubmit}>
            <SimpleTextField
                onChange={(value) => setName(value)}
                label="First Name"
                showErrors={showErrors}
                type="text"
            />
            <SimpleTextField
                onChange={(value) => setLastName(value)}
                label="Last Name"
                showErrors={showErrors}
                type="text"
            />
            <StateAutocompleteComponent onStateChange={(val) => setChosenState(val)} />
            <CityAutocompleteComponent onCityChange={(val) => setChosenCity(val)} state={chosenState} />
            <EmailInputComponent onChange={(email) => setEmail(email)} showErrors={showErrors} />
            <SimpleTextField
                onChange={(value) => setPassword(value)}
                label="Password"
                showErrors={showErrors}
                type="password"
            />

            <StyledSubmitButton type="submit" variant="outlined">
                Submit
            </StyledSubmitButton>
        </Form>
    );
};

export default SignUpForm;
