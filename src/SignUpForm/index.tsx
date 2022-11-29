import {FormEvent, useCallback, useMemo, useState} from 'react';
import {Button} from '@mui/material';
import styled from 'styled-components';
import {UserData} from './types';
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
    const [userData, setUserData] = useState<Partial<UserData>>({});
    const [showErrors, setShowErrors] = useState<boolean>(false);

    const onSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault();

            if (!isFormValid) {
                setShowErrors(true);
                return;
            }
            console.log({userData, isFormValid});

            submitRequest(userData as UserData);
        },
        [userData],
    );

    const isFormValid = useMemo(() => !Object.keys(userData).filter((x) => !x?.length).length, [userData]);

    return (
        <Form onSubmit={onSubmit}>
            <SimpleTextField
                onChange={(val) => setUserData({...userData, firstName: val})}
                label="First Name"
                showErrors={showErrors}
                type="text"
            />
            <SimpleTextField
                onChange={(val) => setUserData({...userData, lastName: val})}
                label="Last Name"
                showErrors={showErrors}
                type="text"
            />
            <StateAutocompleteComponent onStateChange={(val) => setUserData({...userData, country: val})} />
            <CityAutocompleteComponent
                state={userData.country}
                onCityChange={(val) => setUserData({...userData, city: val})}
            />
            <EmailInputComponent
                onChange={(email) => setUserData({...userData, email: email})}
                showErrors={showErrors}
            />
            <SimpleTextField
                onChange={(val) => setUserData({...userData, password: val})}
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
