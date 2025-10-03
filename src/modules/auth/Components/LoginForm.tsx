import {Button, CloseButton, PasswordInput, Stack, TextInput, Title} from '@mantine/core';
import { useState } from 'react';
import { useLogin } from '../hooks';
import {mainColor} from "../../../shared/components/theme/colors.ts";
import {IconAt} from "@tabler/icons-react";

export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password }, {
            onSuccess: () => onSuccess?.(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack p={10}>
                <Title order={2}>
                    Вход
                </Title>
                <TextInput
                    label="Email"
                    value={email}
                    leftSection={<IconAt size={16}/>}
                    rightSectionPointerEvents="all"
                    rightSection={
                        <CloseButton
                            aria-label="Clear input"
                            onClick={() => setEmail('')}
                            style={{ display: email ? undefined : 'none' }}
                        />
                    }
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <PasswordInput
                    label="Password"
                    type="password"
                    value={password}
                    leftSection={<IconAt size={16}/>}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <Button type="submit" color={mainColor} loading={loginMutation.status === "pending"}>
                    Вход
                </Button>
            </Stack>
        </form>
    );
};
