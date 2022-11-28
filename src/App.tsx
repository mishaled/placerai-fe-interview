import styled from 'styled-components';
import './App.css';
import SignUpForm from './SignUpForm';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

function App() {
    return (
        <Container className="App">
            <SignUpForm />
        </Container>
    );
}

export default App;
