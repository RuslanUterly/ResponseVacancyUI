import { useEffect, useState } from "react";
import {
    Button,
    Center,
    Group,
    Paper,
    Select,
    Space,
    Stack,
    TagsInput,
    Text,
    Title,
    Loader, Grid,
} from "@mantine/core";
import { useExcludedWordStore } from "../store.ts";
import { useProfileStore } from "../../profile/store.ts";
import { useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import {cancelColor, mainColor} from "../../../shared/components/theme/colors.ts";

export const ExcludedWordsPage = () => {
    const { user } = useProfileStore();
    const { groupId } = useParams();

    const categories = [
        { value: "header", label: "Заголовок вакансии" },
        { value: "description", label: "Описание вакансии" },
        { value: "company", label: "Компании" },
        { value: "region", label: "Регионы" },
    ];

    const {
        excludedWords,
        fetchExcludedWords,
        createExcludedWord,
        updateExcludedWord,
        deleteExcludedWord,
        loading,
        error,
    } = useExcludedWordStore();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0].value);
    const [currentWords, setCurrentWords] = useState<string[]>([]);

    useEffect(() => {
        if (user?.id && groupId) {
            fetchExcludedWords(BigInt(groupId));
        }
    }, [user?.id, groupId]);

    useEffect(() => {
        const found = excludedWords.find((e) => e.category === selectedCategory);
        setCurrentWords(found ? found.words : []);
    }, [selectedCategory, excludedWords]);

    const handleSave = async () => {
        if (!selectedCategory || !groupId) return;

        const existing = excludedWords.find((e) => e.category === selectedCategory);
        const dto = { category: selectedCategory, words: currentWords };

        if (existing && existing.id) {
            await updateExcludedWord(existing.id, dto);
        } else {
            await createExcludedWord(BigInt(groupId), dto);
        }
    };

    const handleDelete = async () => {
        const existing = excludedWords.find((e) => e.category === selectedCategory);
        if (!existing?.id) return;
        
        await deleteExcludedWord(existing.id);
        setCurrentWords([]);
    };

    return (
        <>
            <Space h="xl" />
            <Space h="xl" />

            <Stack>
                <Title order={4}>Слова исключения</Title>

                <Paper bg="#F8F8F8" withBorder p="md" radius="md">
                    <Stack>
                        {loading && (
                            <Center>
                                <Loader color={mainColor} />
                            </Center>
                        )}
                        
                        <Grid>
                            <Grid.Col span={3}>
                                <Select
                                    label="Категория"
                                    placeholder="Выберите категорию"
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    data={categories}
                                />
                            </Grid.Col>
                            
                            <Grid.Col span={9}>
                                {selectedCategory && (
                                    <>
                                        <TagsInput
                                            label="Слова исключения"
                                            placeholder="Добавьте слова..."
                                            value={currentWords}
                                            onChange={setCurrentWords}
                                        />
                                    </>
                                )}
                            </Grid.Col>
                        </Grid>

                        {!loading && excludedWords.length === 0 && (
                            <Center>
                                <Text c="dimmed">Исключения не найдены</Text>
                            </Center>
                        )}

                        {/*{error && (*/}
                        {/*    <Paper bg="#F5ECEC" p="md" radius="md" withBorder>*/}
                        {/*        <Text c={cancelColor} size="sm">*/}
                        {/*            Ошибка: {error}*/}
                        {/*        </Text>*/}
                        {/*    </Paper>*/}
                        {/*)}*/}
                        
                        {selectedCategory && (
                            <Group justify="flex-end">
                                <Button
                                    color={cancelColor}
                                    variant="light"
                                    onClick={handleDelete}
                                    disabled={!excludedWords.find((e) => e.category === selectedCategory)}
                                >
                                    Удалить
                                </Button>
                                <Button color={mainColor} onClick={handleSave}>
                                    Сохранить
                                </Button>
                            </Group>
                        )}
                    </Stack>
                </Paper>
            </Stack>
        </>
    );
};
