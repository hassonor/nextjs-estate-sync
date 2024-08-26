import '@/assets/styles/global.css';
import 'photoswipe/dist/photoswipe.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {ReactNode} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "@/components/AuthProvider";
import {GlobalProvider} from "@/context/GlobalContext";

export const metadata = {
    title: 'Estate Sync',
    keywords: 'rental,real estate',
    description: 'Find the perfect rental property',
};

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {

    return (
        <AuthProvider>
            <GlobalProvider>
                <html lang="en">
                <body>
                <main>
                    <Navbar/>
                    {children}
                </main>
                <Footer/>
                <ToastContainer/>
                </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    );
};

export default MainLayout;
