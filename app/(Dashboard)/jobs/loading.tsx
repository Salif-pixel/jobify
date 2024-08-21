import React from 'react';

import {Skeleton} from "@/components/ui/skeleton";

function Loading() {
    return (
        <div className='p-8 grid sm:grid-cols-2 gap-4 rounded-lg md:grid-cols-3 border'>
             <Skeleton className='h-10' />
             <Skeleton className='h-10' />
             <Skeleton className='h-10' />
        </div>
        
    );
}

export default Loading;