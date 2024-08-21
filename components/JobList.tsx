'use client';
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllJobsAction} from "@/utils/actions";
import {useSearchParams} from "next/navigation";
import JobCard from "@/components/JobCard";
import ButtonContainer from "@/components/ComplexButtonContainer";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import JobInfo from "@/components/JobInfo";
import {Briefcase, CalendarDays, MapPin, RadioTower} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import DeleteJobButton from "@/components/DeleteJobButton";
import {Skeleton} from "@/components/ui/skeleton";

function JobsList() {
    const searchParams =useSearchParams()
    const search= searchParams.get('search') || '';
    const jobStatus = searchParams.get('jobStatus') || 'all';
    const pagenumber= Number(searchParams.get('page') )|| 1;
    const {data,isPending} = useQuery({
        queryKey:['jobs',search,jobStatus,pagenumber],
        queryFn:()=> getAllJobsAction({search,jobStatus,page:pagenumber})
    })
    const jobs = data?.jobs || [];

    const count = data?.count || 0;
    const page = data?.page || 0;
    const totalPages = data?.totalPages || 0;
    if(isPending)return  <Card className={` text-card-foreground border`}>
        <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className={`mt-4 grid grid-cols-2 gap-4`}>
            <Skeleton className='h-10' />
            <Skeleton className='h-10' />
            <Skeleton className='h-10' />
            <Skeleton className='h-10' />
        </CardContent>

        <CardFooter className={`flex gap-4`}>
            <Skeleton className='h-10' />
            <Skeleton className='h-10' />
        </CardFooter>
    </Card>
    if(jobs.length===0) return <h2 className={`text-xl`}>No jobs found</h2>
    return (
      <>
          <div className={`flex items-center justify-between mb-8`}>
              <h2 className={`text-xl font-semibold capitalize`}>{count} jobs found</h2>
              {totalPages<2 ?null :<ButtonContainer currentPage={page} totalPages={totalPages} />
              }

          </div>
          <div className={`grid md:grid-cols-2 gap-8`}>
              {jobs.map((job)=>{
                  return <JobCard job={job} key={job.id} />
              })}
          </div>
      </>
    );
}

export default JobsList;