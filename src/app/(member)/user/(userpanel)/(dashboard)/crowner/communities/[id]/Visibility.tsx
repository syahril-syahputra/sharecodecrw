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
import { errorHelper } from '@/lib/formErrorHelper';
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
import { ICommunityVisibility } from '@/types/community';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateVisibilityCommunity } from '@/feature/community/useUpdateVisibilityCommunity';

const formSchema = z.object({
    visibility: z.boolean(),
});

export default function CommunityVisibility(props: {
    id?: string | undefined;
    visibility: boolean | undefined;
    refetch: (option?: RefetchOptions | undefined) => void;
}) {
    const { toast } = useToast();
    const [visibilityDialog, setVisibilityDialog] = useState(false);

    const form = useForm<ICommunityVisibility>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            visibility: props.visibility,
        },
    });

    // Acceptance Status
    const { mutate, isPending } = useUpdateVisibilityCommunity({
        onSuccess: (success) => {
            props.refetch();
            setVisibilityDialog(false);
            toast({
                description: success.data.message,
            });
        },
        onError: (error) => {
            errorHelper(form.setError, error);
            toast({
                variant: 'destructive',
                description: error.message,
            });
        },
        id: props.id,
    });

    const visibilityHandler = (value: ICommunityVisibility) => {
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
                                                    Change community visiblity
                                                    of the subscriber
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
