import { useEffect } from "react";
import { useProfileStore } from "../../../modules/profile/store";
import {
    Container, Grid,
    Paper,
    Space,
} from "@mantine/core";
import {ProfileHeader} from "../components/ProfileHeader.tsx";
import {HhCredentialsForm} from "../components/HhCredentialsForm.tsx";
import {HhAutoResponseButton} from "../components/HhAutoResponseButton.tsx";

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
                        <HhCredentialsForm />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper p="md" radius="md" align="center" withBorder>
                        <HhAutoResponseButton/>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
};
