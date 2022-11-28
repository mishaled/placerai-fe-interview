import {useMemo} from 'react';
import {Autocomplete, styled, TextField} from '@mui/material';
import {useStates} from '../universalTutorialApiHooks';

type Props = {
    onStateChange: (val: string) => void;
};

const StyledAutocomplete = styled(Autocomplete)`
    margin: 10px 0 10px 0;
`;

const StateAutocompleteComponent = ({onStateChange}: Props) => {
    const {value: states, error} = useStates();
    const parsedCities = useMemo(() => states?.map((x) => x.state_name), [states]);

    return (
        <StyledAutocomplete
            disablePortal
            options={parsedCities ?? []}
            sx={{width: 300}}
            onChange={(_event, value) => onStateChange(value as string)}
            renderInput={(params) => <TextField {...params} label="USA State" />}
            loading={!states && !error}
            fullWidth
        />
    );
};

export default StateAutocompleteComponent;
