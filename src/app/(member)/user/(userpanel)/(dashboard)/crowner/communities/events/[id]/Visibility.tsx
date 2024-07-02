import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { RefetchOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { errorHelper } from '@/lib/formErrorHelper';
import { useUpdateVisibilityEvent } from '@/feature/events/useUpdateVisibilityEvent';
import { IEventVisibility } from '@/types/events';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
    visibility: z.boolean(),
});

export default function EventVisibility(props: {
    id?: string | undefined;
    visibility: boolean | undefined;
    refetch: (option?: RefetchOptions | undefined) => void;
}) {
    const [visibilityDialog, setVisibilityDialog] = useState(false);
    const { toast } = useToast();
    const form = useForm<IEventVisibility>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            visibility: props.visibility,
        },
    });

    // Acceptance Status
    const { mutate, isPending } = useUpdateVisibilityEvent({
        onSuccess: (success) => {
            props.refetch();
            setVisibilityDialog(false);
            toast({
                title: 'Update Success',
                variant: 'success',
                description: success.data.message,
            });
            // toast({
            //     description: success.data.message,
            // });
        },
        onError: (error) => {
            errorHelper(form.setError, error);
            toast({
                title: 'Update Failed',
                variant: 'destructive',
                description: error.message,
            });
            // toast({
            //     variant: 'destructive',
            //     description: error.message,
            // });
        },
        id: props.id,
    });

    const visibilityHandler = (value: IEventVisibility) => {
        mutate(value);
    };
    return (
        <Fragment>
            <Button
                size={'sm'}
                variant={'secondary'}
                loading={isPending}
                onClick={() => setVisibilityDialog(true)}
            >
                <EyeIcon className="mr-2" />
                Visibility
            </Button>
            <AlertDialog open={visibilityDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Visibility</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Form {...form}>
                                <FormField
                                    control={form.control}
                                    name="visibility"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-primary">
                                                    Visibility
                                                </FormLabel>
                                                <FormDescription>
                                                    Change event visiblity of
                                                    the subscriber
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setVisibilityDialog(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={form.handleSubmit(visibilityHandler)}
                        >
                            Change
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    );
}
