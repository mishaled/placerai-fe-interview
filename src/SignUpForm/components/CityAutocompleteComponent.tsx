import {useMemo} from 'react';
import styled from 'styled-components';
import {Autocomplete, TextField} from '@mui/material';
import {useCities} from '../universalTutorialApiHooks';
import {City, State} from '../types';

type Props = {
    state?: State;
    onCityChange: (val: City) => void;
};

const StyledAutocomplete = styled(Autocomplete)`
    margin: 10px 0 10px 0;
`;

const CityAutocompleteComponent = ({state, onCityChange}: Props) => {
    const {value: cities, error} = useCities(state?.state_name);
    const parsedCities = useMemo(() => cities?.map((x) => x.city_name), [cities]);

    console.log('cities', {cities, error, state});

    return (
        <StyledAutocomplete
            disablePortal
            options={parsedCities ?? []}
            sx={{width: 300}}
            onChange={(_event, value) => onCityChange(value as City)}
            renderInput={(params) => <TextField {...params} label="City" />}
            disabled={!cities?.length && !error}
            fullWidth
        />
    );
};

export default CityAutocompleteComponent;
