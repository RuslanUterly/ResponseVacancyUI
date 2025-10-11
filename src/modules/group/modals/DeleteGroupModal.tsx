import { useNavigate } from 'react-router-dom';
import { Container } from '@mantine/core';
import { useGroupStore } from '../store.ts';
import { ConfirmDialog } from '../../../shared/modals/confirms/ConfirmDialog.tsx';
import type {DeleteGroupModalProps} from "../types.ts";
import {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";

export const DeleteGroupModal = ({ currentGroup, onClose }: DeleteGroupModalProps) => {
    const navigate = useNavigate();
    const { error, deleteGroup } = useGroupStore();
    const [deleted, setDeleted] = useState(false);

    const handleDelete = async () => {
        if (!currentGroup.id) return;

        await deleteGroup(currentGroup.id);
        setDeleted(true);
    };
    
    useEffect(() => {
        if (deleted) {
            if (!error) {
                notifications.show({
                    title: 'Успешно',
                    message: 'Группа удалена!',
                    color: 'green',
                    icon: <IconCheck size={18} />,
                });
                navigate('/');
            } else {
                notifications.show({
                    title: 'Ошибка',
                    message: error ?? 'Не удалось удалить группу',
                    color: 'red',
                    icon: <IconX size={18} />,
                });
            }
            setDeleted(false);
    
            if (onClose) {
                onClose();
            } else {
                navigate('/');
            }
        }
    }, [deleted, error]);

    return (
        <Container size="md">
            <ConfirmDialog
                opened={true}
                message={`Вы уверены, что хотите удалить группу #${currentGroup.id}?`}
                onConfirm={handleDelete}
                onCancel={onClose ? onClose : () => navigate(`/groups/${currentGroup.id}`)}
                confirmLabel="Удалить"
            />
        </Container>
    );
};