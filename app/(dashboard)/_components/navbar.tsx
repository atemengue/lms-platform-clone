import { NavbarRoutes } from "@/components/ui/navbar-routes";
import ModileSideBar from "./mobile-sidebar";

const Navbar = () => {
    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <ModileSideBar />
            <NavbarRoutes />
        </div>
     );
}
 
export default Navbar;