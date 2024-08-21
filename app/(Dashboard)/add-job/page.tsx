import React from 'react';
import CreateJobForm from "@/components/CreatejobForm";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
const queryClient = new QueryClient();
function AddJobPage() {

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CreateJobForm />
        </HydrationBoundary>
    );
}
export default AddJobPage;