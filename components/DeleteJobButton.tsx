import { Button } from './ui/button';
import { Badge } from './ui/badge';
import JobInfo from './JobInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobAction } from '@/utils/actions';
import { useToast } from '@/components/ui/use-toast';
import {Loader2} from "lucide-react";
import { ToastAction } from "@/components/ui/toast"
function DeleteJobButton({ id }: { id: string }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteJobAction(id),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    description: 'there was an error',
                });
                return;
            }
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            queryClient.invalidateQueries({ queryKey: ['charts'] });

            toast({
                title: "Job removed successfully",
                description: "Job has been removed from your List",
                action: (

                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        },
    });
    return (
<>
    {isPending?
        <Button className={`self-end capitalize`} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>:    <Button className={`self-end capitalize`} onClick={() => {
            mutate(id);
        }}  type={'submit'}>delete</Button>}
</>
    );
}
export default DeleteJobButton;