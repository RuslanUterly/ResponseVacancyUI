import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom';
import {IconMoon, IconSun} from "@tabler/icons-react";
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <MantineProvider theme={{
            other: {
                icons: {
                    theme: {
                        light: IconSun, 
                        dark: IconMoon, 
                    },
                },
            },
        }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </QueryClientProvider>
)