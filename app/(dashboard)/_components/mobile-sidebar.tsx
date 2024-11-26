import { Menu } from 'lucide-react';

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet';
import Sidebar from './sidebar';

const ModileSideBar = () => {
    return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transiation">
            <Menu />
        </SheetTrigger>
        <SheetContent side="left" className='p-0 bg-white'>
            <Sidebar />
        </SheetContent>
    </Sheet>
    )
}
 
export default ModileSideBar;