import {Container, Paper, Center} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';

export default function RegisterPage() {
    const navigate = useNavigate();

    return (
        <Center style={{ minHeight: '100vh', padding: 16 }}>
            <Container size="sm" mt="xl">
                <Paper p="md" radius="md" withBorder>
                    <RegisterForm onSuccess={() => navigate('/auth/login')} />
                </Paper>
            </Container>
        </Center>
    );
}
