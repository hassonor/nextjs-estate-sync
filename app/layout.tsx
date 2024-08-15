import '@/assets/styles/global.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {ReactNode} from 'react';
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
    title: 'Estate Sync',
    keywords: 'rental,real estate',
    description: 'Find the perfect rental property',
};

const MainLayout = ({children}: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <html lang="en">
            <body>
            <main>
                <Navbar/>
                {children}
            </main>
            <Footer/>
            </body>
            </html>
        </AuthProvider>
    );
};

export default MainLayout;
