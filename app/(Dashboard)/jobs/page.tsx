import JobsList from '@/components/JobList';
import SearchForm from '@/components/SearchForm';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { getAllJobsAction } from '@/utils/actions';
async function JobsPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['jobs','','all',1],
        queryFn:()=> getAllJobsAction({}),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className={``}>
                <SearchForm />
                <JobsList />
            </div>
        </HydrationBoundary>
    );
}

export default JobsPage;