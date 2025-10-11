import {Modal, Text, Group, Button, Title, Stack} from '@mantine/core';
import {cancelColor} from "../../components/theme/colors.ts";
import type {FC} from "react";

interface ConfirmDialogProps {
    opened: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
                                                          opened,
                                                          title,
                                                          message,
                                                          onConfirm,
                                                          onCancel,
                                                          confirmLabel = 'Подтвердить',
                                                          cancelLabel = 'Отмена',
                                                      }) => (
    <Modal opened={opened} onClose={onCancel} withCloseButton={false} centered>
        <Stack>
            <Title order={3}>{title || 'Подтверждение'}</Title>
            <Text mb="md">{message}</Text>
            <Group justify="space-between">
                <Button variant="light" color={cancelColor} onClick={onCancel}>
                    {cancelLabel}
                </Button>
                <Button color={cancelColor} onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </Group> 
        </Stack>
    </Modal>
);
