import Navbar from '../components/navbar'
const Layout = ({children}) => {
    return (
        <div className="pt-2 min-h-screen bg-gradient-to-br from-orange-200 via-emerald-500 to-fuchsia-900">
            <Navbar />
            <div className="grid grid-cols-home-sm sm:grid-cols-home-md md:grid-cols-home-lg">
                <div className=""></div>
                <div className="content">
                    {children}
                </div>
                <div className=""></div>
            </div>
        </div>
        )
    }
    
export default Layout;