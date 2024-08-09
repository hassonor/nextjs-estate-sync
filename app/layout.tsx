import '@/assets/styles/global.css';


export const metadata = {
    title: 'Estate Sync', keywords: 'rental,real estate'
    , description: 'Find the perfect rental  property'
}
export const MainLayout = ({children}) => {
    return (
        <html>
        <body>
        <main>
            {children}
        </main>
        </body>
        </html>
    )
}

export default MainLayout;