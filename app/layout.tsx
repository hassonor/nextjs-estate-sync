import '@/assets/styles/global.css';
import Navbar from "@/components/Navbar";


export const metadata = {
    title: 'Estate Sync', keywords: 'rental,real estate'
    , description: 'Find the perfect rental  property'
}
export const MainLayout = ({children}) => {
    return (
        <html>
        <body>
        <main>
            <Navbar/>
            {children}
        </main>
        </body>
        </html>
    )
}

export default MainLayout;