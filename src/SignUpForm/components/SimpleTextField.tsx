import {useState} from 'react';
import {TextField} from '@mui/material';

type Props = {
    onChange: (val: string) => void;
    label: string;
    type: 'text' | 'password';
    showErrors: boolean;
};

const SimpleTextField = ({onChange, label, type, showErrors}: Props) => {
    const [value, setValue] = useState<string | undefined>();

    return (
        <TextField
            type={type}
            placeholder={label}
            margin="normal"
            required
            fullWidth
            onChange={(event) => {
                setValue(event.target.value);
                onChange(event.target.value);
            }}
            error={showErrors && !value}
        />
    );
};

export default SimpleTextField;
