'use client';
import { Loader2 } from "lucide-react"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAction } from "@/components/ui/toast"
import {
    JobStatus,
    JobMode,
    createAndEditJobSchema,
    CreateAndEditJobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './FormComponents';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import {createJobAction} from "@/utils/actions";
function CreatejobForm() {
    const from = useForm<CreateAndEditJobType>({
        resolver: zodResolver(createAndEditJobSchema),
        defaultValues:{
            position: '',
            company: '',
            location: '',
            status: JobStatus.Pending,
            mode: JobMode.FullTime,
        }
    });
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const router = useRouter();
    const {mutate,isPending}=useMutation({
mutationFn:(values:CreateAndEditJobType)=>createJobAction(values),
        onSuccess:(data)=>{
            if(!data){
                 toast({description:'error creating job'});
            }
            toast({description:''});
            toast({
                title: "Job created successfully",
                description: "Job has been added to your List.",
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
            queryClient.invalidateQueries({queryKey:['jobs']});
            queryClient.invalidateQueries({queryKey:['stats']});
            queryClient.invalidateQueries({queryKey:['charts']});
            router.push('/jobs');
        },
    })
    function onSubmit(values:CreateAndEditJobType){
        mutate(values);
    }
    return (
       <Form {...from} >
           <form className={`bg-muted p-8 rounded-lg`} onSubmit={from.handleSubmit(onSubmit)}>
               <h2 className={`capitalize font-semibold text-4xl mb-6`}>add job</h2>
               <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start`}>
                     <CustomFormField name={'position'} control={from.control} />
                     <CustomFormField name={'company'} control={from.control} />
                     <CustomFormField name={'location'} control={from.control} />
                     <CustomFormSelect name={'status'} control={from.control} items={Object.values(JobStatus)} labelText={'Job Status'}/>
                     <CustomFormSelect name={'mode'} control={from.control} items={Object.values(JobMode)} labelText={'Job Mode'}/>
                   {isPending?
                   <Button className={`self-end capitalize`} disabled>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                       Please wait
                   </Button>:    <Button className={`self-end capitalize`}  type={'submit'}>create job</Button>}
               </div>

           </form>
       </Form>
    );
}

export default CreatejobForm;