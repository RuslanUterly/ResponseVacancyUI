export interface GroupSettings {
    text?: string;
    area?: number;
    experience?: string;
    schedule?: string;
}

export interface GroupDto {
    id?: bigint;
    settings?: GroupSettings;
}

export interface GroupCardProps {
    group: GroupDto;
    onClick?: () => void;
}

export interface GroupFormProps {
    initialValues: GroupDto;
    onSubmit: (values: GroupDto) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
}

export interface DeleteGroupModalProps {
    currentGroup: GroupDto;
    onClose?: () => void;
}