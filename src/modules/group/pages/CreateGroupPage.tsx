import { useNavigate } from "react-router-dom";
import {
    Paper,
    Title,
    Space,
    Container,
} from "@mantine/core";
import { useGroupStore } from "../store.ts";
import {GroupForm} from "../components/GroupForm.tsx";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import type {GroupDto} from "../types.ts";
import {useEffect, useState} from "react";

export const CreateGroupPage = () => {
    const navigate = useNavigate();
    const { error, createGroup, loading } = useGroupStore();
    const [created, setCreated] = useState(false);

    const handleCreate = async (values: GroupDto) => {
        await createGroup(values);
        setCreated(true);
    };

    useEffect(() => {
        if (created) {
            if (!error) {
                notifications.show({
                    title: "Успешно",
                    message: "Группа успешно создана!",
                    color: "green",
                    icon: <IconCheck size={18} />,
                });
                navigate("/");
            } else {
                notifications.show({
                    title: "Ошибка",
                    message: error ?? "Не удалось создать группу",
                    color: "red",
                    icon: <IconX size={18} />,
                });
            }
            setCreated(false);
        }
    }, [created, error]);

    return (
        <Container size={500} style={{ width: "100%" }}>
            <Space h="xl" />
            
            <Paper withBorder p="xl" radius="md">
                <Title order={3}>Создание новой группы</Title>
                <Space h="md" />
                <GroupForm
                    initialValues={{ settings: { text: "", area: undefined, experience: "", schedule: "" } }}
                    onSubmit={async (values) => {
                        await handleCreate(values);
                    }}
                    onCancel={() => navigate("/")}
                    loading={loading}
                />
            </Paper>
        </Container>
    );
};
