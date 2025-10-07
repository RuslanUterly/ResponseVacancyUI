import './App.css';
import {Header} from "./modules/header";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./shared/components/route/ProtectedRoute.tsx";
import LoginPage from "./modules/auth/pages/LoginPage.tsx";
import RegisterPage from "./modules/auth/pages/RegisterPage.tsx";
import {useProfileStore} from "./modules/profile/store.ts";
import {useEffect} from "react";
import {NotFoundPage} from "./shared/pages/NotFoundPage.tsx";
import LayoutCenter from "./shared/components/layout/LayoutCenter.tsx";
import {ProfilePage} from "./modules/profile/pages/ProfilePage.tsx";

function App() {
    const initProfile = useProfileStore((state) => state.init);

    useEffect(() => {
        initProfile();
    }, []);
    
    return (
        <div className="container-fill">
            <Header />
            
            <Routes>
                {/*<Route path="/" element={<Home />} />*/}
                <Route path="/auth/login" element={
                    <LayoutCenter>
                        <LoginPage />
                    </LayoutCenter>
                } />
                <Route path="/auth/register" element={
                    <LayoutCenter>
                        <RegisterPage />
                    </LayoutCenter>
                } />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            {/*<div></div>*/}
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={
                    <LayoutCenter>
                        <NotFoundPage />
                    </LayoutCenter>
                } />
            </Routes>

            {/*<Footer />*/}
        </div>
    )
}

export default App