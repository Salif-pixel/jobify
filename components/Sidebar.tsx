'use client';
import React from 'react';
import logo from '../assets/logo.svg';
import {usePathname} from "next/navigation";
import Image from "next/image";
import links from "@/utils/links";
import {Button} from "@/components/ui/button";
import Link from "next/link";
// eslint-disable-next-line react-hooks/rules-of-hooks
import {
    Home,
} from "lucide-react"
import {
    Tooltip,
    TooltipContent, TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
function Sidebar() {
    const pathname = usePathname();
    return (
        // <aside className={`py-4 px-8 bg-muted h-full`}>
        //     <Image src={logo} alt={'logo'} className={`mx-auto`} />
        //     <div className={`flex flex-col mt-20  gap-y-4`}>
        //         {links.map((link)=>{
        //             return (<Button asChild key={link.href} variant={pathname===link.href?'default':'link'}>
        //                     <Link href={link.href} className={`flex items-center gap-x-2`}>
        //                         {link.icon}
        //                         <span className={`capitalize`}>{link.label}</span>
        //                     </Link>
        //                 </Button>
        //                 )
        //         })}
        //     </div>
        // </aside>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="/"
                    className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base`}
                >
                    <Home className="h-4 w-4 transition-all group-hover:scale-110"/>
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <TooltipProvider>
                    {links.map((link)=>{
                                    return (  <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link
                                                        href={link.href}
                                                        className={pathname===link.href?`flex h-9 w-9 items-center justify-center bg-primary rounded-lg text-muted transition-colors hover:text-foreground md:h-8 md:w-8`:`flex h-9 w-9 items-center justify-center  rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                                    >
                                                        {link.icon}
                                                        <span className="sr-only">{link.label}</span>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent side="right">{link.label}</TooltipContent>
                                            </Tooltip>
                                        )
                                })}

                </TooltipProvider>
            </nav>

        </aside>
    );
}

export default Sidebar;