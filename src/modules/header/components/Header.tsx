import {Burger, Button, Container, Group, Modal, Title} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from './Header.module.css';
import { ThemeToggle } from "../../../shared/components/theme/ThemeToogle.tsx";
import {mainColor} from "../../../shared/components/theme/colors.ts";
import {useAuthStore} from "../../auth/store.ts";
import {useState} from "react";
import {RegisterForm} from "../../auth/Components/RegisterForm.tsx";
import {LoginForm} from "../../auth/Components/LoginForm.tsx";

export const Header = () => {
    const [opened, { toggle }] = useDisclosure(false);

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    const [loginOpened, setLoginOpened] = useState(false);
    const [registerOpened, setRegisterOpened] = useState(false);

    return (
        <>
            <header className={classes.header}>
                <Container size="md">
                    <div className={classes.inner}>
                        <Title c={mainColor} order={1}>RV</Title>
                        <Group visibleFrom="sm" gap="xl">
                            <Group visibleFrom="sm">
                                <ThemeToggle/>
                            </Group>
                            <Group>
                                {isAuthenticated ? (
                                    <Button onClick={logout}>Выйти</Button>
                                ) : (
                                    <>
                                        <Button color={mainColor} variant="filled" onClick={() => setLoginOpened(true)}>Вход</Button>
                                        <Button color={mainColor} variant="outline" onClick={() => setRegisterOpened(true)}>Регистрация</Button>
                                    </>
                                )}
                            </Group>
                        </Group>
                        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    </div>
                </Container>
            </header>
    
            <Modal opened={loginOpened} onClose={() => setLoginOpened(false)} withCloseButton={false} centered>
                <LoginForm onSuccess={() => setLoginOpened(false)} />
            </Modal>
        
            <Modal opened={registerOpened} onClose={() => setRegisterOpened(false)} withCloseButton={false} centered>
                <RegisterForm onSuccess={() => setRegisterOpened(false)} />
            </Modal>
        </>
    );
}