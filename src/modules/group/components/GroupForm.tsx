import { useForm } from "@mantine/form";
import {Stack, TextInput, NumberInput, Select, Button, Group, Loader, Textarea} from "@mantine/core";
import type {GroupDto, GroupFormProps} from "../types.ts";
import { mainColor, cancelColor } from "../../../shared/components/theme/colors.ts";
import {useProfileStore} from "../../profile/store.ts";
import {useEffect} from "react";

export const GroupForm = ({ initialValues, onSubmit, onCancel, loading }: GroupFormProps) => {
    const { resumes, fetchResumes, isLoading: resumesLoading } = useProfileStore();
    
    const form = useForm<GroupDto>({
        initialValues,
        validate: {
            settings: {
                text: (v) => ((v ?? "").trim().length > 0 ? null : "Обязательное поле"),
                area: (v) => (typeof v === "number" && !Number.isNaN(v) ? null : "Укажите регион"),
                experience: (v) => (v ? null : "Выберите опыт"),
                schedule: (v) => (v ? null : "Выберите график"),
            },
            resumeId: (v) => (v ? null : "Выберите резюме"),
        },
    });

    const handleSubmit = form.onSubmit(onSubmit);

    useEffect(() => {
        if (!resumes) {
            fetchResumes();
        }
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput label="Текст" placeholder="Введите поисковый текст" {...form.getInputProps("settings.text")} />
                <NumberInput label="Регион (area)" placeholder="Введите ID региона" {...form.getInputProps("settings.area")} />
                <Select
                    label="Опыт"
                    data={[
                        { value: "noExperience", label: "Без опыта" },
                        { value: "between1And3", label: "От 1 до 3 лет" },
                        { value: "between3And6", label: "От 3 до 6 лет" },
                        { value: "moreThan6", label: "Более 6 лет" },
                    ]}
                    {...form.getInputProps("settings.experience")}
                />
                <Select
                    label="График"
                    data={[
                        { value: "fullDay", label: "Полный день" },
                        { value: "flexible", label: "Гибкий график" },
                        { value: "remote", label: "Удалённая работа" },
                        { value: "shift", label: "Сменный график" },
                    ]}
                    {...form.getInputProps("settings.schedule")}
                />
                <Select
                    label="Резюме"
                    placeholder={resumesLoading ? "Загрузка..." : "Выберите резюме"}
                    data={(resumes ?? []).map((r) => ({
                        value: String(r.id),
                        label: r.title,
                    }))}
                    rightSection={resumesLoading ? <Loader color={mainColor} size="xs" /> : null}
                    {...form.getInputProps("resumeId")}
                />
                <Textarea
                    label="Сопроводительное письмо"
                    placeholder="Введите текст письма"
                    autosize
                    minRows={3}
                    {...form.getInputProps("message")}
                />
                <Group justify="space-between" mt="md">
                    <Button color={cancelColor} variant="light" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button color={mainColor} type="submit" loading={loading}>
                        Сохранить
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};
