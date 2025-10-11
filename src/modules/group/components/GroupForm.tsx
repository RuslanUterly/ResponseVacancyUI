import { useForm } from "@mantine/form";
import { Stack, TextInput, NumberInput, Select, Button, Group } from "@mantine/core";
import type {GroupDto, GroupFormProps} from "../types.ts";
import { mainColor, cancelColor } from "../../../shared/components/theme/colors.ts";

export const GroupForm = ({ initialValues, onSubmit, onCancel, loading }: GroupFormProps) => {
    const form = useForm<GroupDto>({
        initialValues,
        validate: {
            settings: {
                text: (v) => ((v ?? "").trim().length > 0 ? null : "Обязательное поле"),
                area: (v) => (typeof v === "number" && !Number.isNaN(v) ? null : "Укажите регион"),
                experience: (v) => (v ? null : "Выберите опыт"),
                schedule: (v) => (v ? null : "Выберите график"),
            },
        },
    });

    const handleSubmit = form.onSubmit(onSubmit);

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
