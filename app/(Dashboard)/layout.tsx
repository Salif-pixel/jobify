import React, {PropsWithChildren} from 'react';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

function Layout({
                    children,
                }: PropsWithChildren) {
    return (
        <main className={``}>
            <Navbar/>
            <div className={`hidden lg:block  `}>
                <Sidebar/>
            </div>
                <div className={`py-16 px-4 sm:px-8  lg:px-16`}>
                    {children}
                </div>

        </main>
    );
}

export default Layout;