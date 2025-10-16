import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Paper,
    Title,
    Space,
    Container,
    Loader, Center,
} from "@mantine/core";
import { useGroupStore } from "../store.ts";
import { GroupForm } from "../components/GroupForm.tsx";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import {mainColor} from "../../../shared/components/theme/colors.ts";

export const EditGroupPage = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const { error, currentGroup, fetchGroupById, updateGroup, loading } = useGroupStore();
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (groupId) fetchGroupById(BigInt(groupId));
    }, [groupId]);

    const handleUpdate = async (values: typeof currentGroup) => {
        if (!currentGroup?.id || !values) return;
        await updateGroup(currentGroup.id, values);
        setUpdated(true);
    };

    useEffect(() => {
        if (!updated) return;

        if (!error) {
            notifications.show({
                title: "Успешно",
                message: "Данные были обновлены!",
                color: "green",
                icon: <IconCheck size={18} />,
            });
            navigate(`/groups/${currentGroup?.id}`);
        } else {
            notifications.show({
                title: "Ошибка",
                message: error ?? "Не удалось обновить группу",
                color: "red",
                icon: <IconX size={18} />,
            });
        }

        setUpdated(false);
    }, [updated, error]);

    return (
        <Container size={500} style={{ width: "100%" }}>
            <Space h="xl" />

            <Paper withBorder p="xl" radius="md">
                <Title order={3}>Изменение группы</Title>
                <Space h="md" />

                {loading || !currentGroup ? (
                    <Center>
                        <Loader color={mainColor} />
                    </Center>
                ) : (
                    <GroupForm
                        initialValues={currentGroup}
                        onSubmit={handleUpdate}
                        onCancel={() => navigate(`/groups/${currentGroup.id}`)}
                        loading={loading}
                    />
                )}
            </Paper>
        </Container>
    );
};
