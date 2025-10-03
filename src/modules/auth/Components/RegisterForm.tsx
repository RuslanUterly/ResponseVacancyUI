import {Button, Stack, TextInput, Title} from '@mantine/core';
import { useState } from 'react';
import { useRegister } from '../hooks';
import {mainColor} from "../../../shared/components/theme/colors.ts";
import {IconAt} from "@tabler/icons-react";

export const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registerMutation = useRegister();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate({ email, password }, {
            onSuccess: () => onSuccess?.(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <Title order={2}>
                    Регистрация
                </Title>
                <TextInput
                    label="Email"
                    value={email}
                    leftSection={<IconAt size={16}/>}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <TextInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <Button type="submit" color={mainColor} loading={registerMutation.status === "pending"}>
                    Регистрация
                </Button>
            </Stack>
        </form>
    );
};
