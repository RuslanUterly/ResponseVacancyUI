import { useEffect } from "react";
import { useProfileStore } from "../../../modules/profile/store";
import {
    Container, Grid, Group,
    Paper,
    Space,
} from "@mantine/core";
import {ProfileHeader} from "../components/ProfileHeader.tsx";
import {HhAutoResponseButton} from "../components/HhAutoResponseButton.tsx";
import {HhConnectionButton} from "../components/HhConnectionButton.tsx";

export const ProfilePage = () => {
    const { user, fetchProfile } = useProfileStore();

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <Container size="md" style={{ width: "100%" }}>
            <ProfileHeader email={user?.email} />
            <Space h="lg" />
            <Grid>
                <Grid.Col span={6}>
                    <Paper p="md" radius="md" withBorder>
                        <Group justify="space-between">
                            <HhConnectionButton />
                            <HhAutoResponseButton/>
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
};
