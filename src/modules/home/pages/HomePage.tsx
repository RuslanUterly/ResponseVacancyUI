import {GroupsPage} from "../../group/pages/GroupsPage.tsx";
import {Container} from "@mantine/core";

export const HomePage = () => {
    return (
        <Container size="md" style={{ width: "100%" }}>
            <GroupsPage></GroupsPage>
        </Container>
    );
};