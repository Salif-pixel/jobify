'use client';
import React from 'react';
import LinksDropdown from "@/components/LinksDropdown";
import ThemeToggle from "@/components/ThemeToggle";
import {UserButton} from "@clerk/nextjs";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {usePathname} from "next/navigation";


function Navbar() {
    let path =usePathname();
    return (
        // <nav className={`bg-muted py-4 sm:px-16 lg:px-24 flex items-center justify-between`}>
        //
        //     <div>
        //         <LinksDropdown/>
        //     </div>
        //     <div className={`flex items-center gap-x-4`}>
        //         <ThemeToggle/>
        //         <UserButton afterSignOutUrl={'/'}/>
        //     </div>
        // </nav>
        <header
            className=" py-4 sm:px-16 lg:px-24 flex items-center justify-between">
            <div>
                 <LinksDropdown/>

            </div>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>

                        <BreadcrumbLink asChild><BreadcrumbPage>home</BreadcrumbPage></BreadcrumbLink>

                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <BreadcrumbPage>{path.slice(1)}</BreadcrumbPage>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>

            <div className={`flex items-center gap-x-4`}>
                <ThemeToggle/>
                <UserButton afterSignOutUrl={'/'}/>

            </div>
        </header>
    );
}

export default Navbar;