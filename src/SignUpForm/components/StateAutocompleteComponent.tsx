import {useMemo} from 'react';
import {Autocomplete, styled, TextField} from '@mui/material';
import {useStates} from '../universalTutorialApiHooks';
import {State} from '../types';

type Props = {
    onStateChange: (val: State) => void;
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
            onChange={(_event, value) => onStateChange(value as State)}
            renderInput={(params) => <TextField {...params} label="USA State" />}
            loading={!states && !error}
            fullWidth
        />
    );
};

export default StateAutocompleteComponent;
