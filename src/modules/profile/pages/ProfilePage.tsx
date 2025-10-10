import { useEffect } from "react";
import { useProfileStore } from "../../../modules/profile/store";
import {
    Container,
    Paper,
    SimpleGrid,
    Space,
} from "@mantine/core";
import {ProfileHeader} from "../components/ProfileHeader.tsx";
import {HhCredentialsForm} from "../components/HhCredentialsForm.tsx";

export const ProfilePage = () => {
    const { user, fetchProfile } = useProfileStore();

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <Container size="md" style={{ width: "100%" }}>
            <ProfileHeader email={user?.email} />
            <Space h="lg" />
            <SimpleGrid cols={2}>
                <Paper p="md" radius="md" withBorder>
                    <HhCredentialsForm />
                </Paper>
                <Paper>
                    
                </Paper>
            </SimpleGrid>
        </Container>
    );
};
