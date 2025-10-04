import {Header} from "./modules/header";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./shared/components/route/ProtectedRoute.tsx";
import LoginPage from "./modules/auth/pages/LoginPage.tsx";
import RegisterPage from "./modules/auth/pages/RegisterPage.tsx";

function App() {
    return (
        <>
            <Header />

            <Routes>
                {/*<Route path="/" element={<Home />} />*/}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <div></div>
                            {/*<ProfilePage />*/}
                        </ProtectedRoute>
                    }
                />

                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    )
}

export default App