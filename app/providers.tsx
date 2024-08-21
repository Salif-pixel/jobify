'use client';
import React, {useState} from 'react';
import ThemeProvider from "@/components/Theme-providers";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "@/components/ui/toaster";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function Providers({children}:{children:React.ReactNode}) {

    const [queryClient]=useState(()=>new QueryClient({
        defaultOptions:{
            queries:{
                refetchOnWindowFocus:false,
                retry:false,
                staleTime:60 * 1000 *5,
            },
        },
    }));
    return (
        <>
            <ThemeProvider
                attribute={"class"}
                defaultTheme={"system"}
                enableSystem
                disableTransitionOnChange
            >
                <Toaster/>
                <QueryClientProvider client={queryClient}>
                    {children}
                   
                </QueryClientProvider>

           </ThemeProvider>

        </>
    );
}

export default Providers;