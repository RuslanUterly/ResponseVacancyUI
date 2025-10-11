import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Title, Text, Stack, Button, Container, Space, Group} from "@mantine/core";
import { useGroupStore } from "../store.ts";
import type { GroupSettings } from "../types.ts";
import {cancelColor, mainColor} from "../../../shared/components/theme/colors.ts";
import {GroupCard} from "../components/GroupCard.tsx";
import {DeleteGroupModal} from "../modals/DeleteGroupModal.tsx";

export const GroupPage = () => {
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { groupId } = useParams();
    const { currentGroup, fetchGroupById } = useGroupStore();

    useEffect(() => {
        if (groupId) {
            fetchGroupById(BigInt(groupId));
        }
    }, [groupId]);

    if (!currentGroup) return (
        <Container size="md" style={{ width: "100%" }}>
            <Text>Группа не найдена</Text>
        </Container>
    );

    const settings = currentGroup.settings as GroupSettings | undefined;

    return (
        <Container size="md" style={{ width: "100%" }}>
            <Space h="xl" />
            <Space h="xl" />
            
            <Stack>
                <Group justify="space-between">
                    <Title order={3}>Группа #{currentGroup.id}</Title>

                    <Group>
                        <Button
                            color={mainColor}
                            onClick={() => {
                                if (currentGroup?.id) {
                                    navigate(`/groups/${currentGroup.id}/edit`);
                                }
                            }}
                        >
                            Изменить
                        </Button>

                        <Button
                            color={cancelColor}
                            onClick={() => setIsDeleteModalOpen(true)}
                        >
                            Удалить
                        </Button>
                    </Group>

                </Group>

                {settings ? (
                    <GroupCard
                        key={currentGroup.id}
                        group={currentGroup}
                        onClick={() => {}}
                    />
                ) : (
                    <Text>Настройки не заданы</Text>
                )}
            </Stack>

            {isDeleteModalOpen && (
                <DeleteGroupModal
                    currentGroup={currentGroup}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            )}
        </Container>
    );
};
