import {TextField} from '@mui/material';
import {useCallback, useState} from 'react';
import isEmail from 'validator/lib/isEmail';

type Props = {
    onChange: (val: string) => void;
    showErrors: boolean;
};

const EmailInputComponent = ({onChange, showErrors}: Props) => {
    const [email, setEmail] = useState<string | undefined>();

    const handleOnChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const currentValue = event.target.value;
            setEmail(currentValue);

            if (isEmail(currentValue)) {
                onChange(currentValue);
                return;
            }

            onChange('');
        },
        [onChange],
    );

    return (
        <TextField
            type="text"
            name="name"
            placeholder="Email"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            onChange={handleOnChange}
            error={showErrors && !isEmail(email || '')}
        />
    );
};

export default EmailInputComponent;
