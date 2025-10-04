import {Burger, Button, Container, Group, Title} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from './Header.module.css';
import { ThemeToggle } from "../../../shared/components/theme/ThemeToogle.tsx";
import {mainColor} from "../../../shared/components/theme/colors.ts";
import {useAuthStore} from "../../auth/store.ts";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

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
                                    <Button color={mainColor} onClick={() => { logout(); navigate('/'); }}>Выйти</Button>
                                ) : (
                                    <>
                                        <Button color={mainColor} variant="filled" onClick={() => navigate('/auth/login')}>Вход</Button>
                                        <Button color={mainColor} variant="outline" onClick={() => navigate('/auth/register')}>Регистрация</Button>
                                    </>
                                )}
                            </Group>
                        </Group>
                        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    </div>
                </Container>
            </header>
        </>
    );
}