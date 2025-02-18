import { PasswordInput } from '@/components/ui/password-input';
import { BodyCompanyRegistration } from '@/types/auth';
import { errorHelper } from '@/lib/formErrorHelper';
import { useCompanyRegistration } from '@/feature/auth/register';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { File, Info, Key, Mail, MapPin, Upload } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { FileToBase64 } from '@/lib/utils';
import React from 'react';

const formSchema = z
    .object({
        company_name: z
            .string()
            .min(1, { message: 'Company name is required' }),
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Invalid Email' }),
        province: z.string().min(1, { message: 'Province is required' }),
        city: z.string().min(1, { message: 'City is required' }),
        password: z.string().min(1, { message: 'Password is required' }),
        confirm_password: z
            .string()
            .min(1, { message: 'Comfirm Password is required' }),
        address: z.string().optional(),
        business_license: z
            .string()
            .min(1, { message: 'Business License is required' }),
        business_license_name: z.string().optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Confirm Passwords don't match",
        path: ['confirm_password'],
    });

export default function CompanyRegistration() {
    const { mutate, isPending, isError, error } = useCompanyRegistration({
        onSuccess: onSucces,
        onError: (error) => errorHelper(form.setError, error),
    });

    async function onSucces() {
        await signIn('credentials', {
            email: form.getValues().email,
            password: form.getValues().password,
            remember_me: false,
            callbackUrl: '/email-verification',
        });
        form.reset();
        // console.log(data);
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const body: BodyCompanyRegistration = {
            company_name: values.company_name,
            address: values.address || '',
            business_license: values.business_license,
            email: values.email,
            city_id: values.city,
            password: values.password,
            password_confirmation: values.confirm_password,
        };
        mutate(body);
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {},
    });
    const { data: dataState } = useFetchState();
    const { data: dataCity } = useFetchCity(form.getValues('province'), () => {
        form.setValue('city', '');
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.type === 'application/pdf') {
            let base64 = undefined;
            const fileBase64 = (await FileToBase64(file)) as string;
            base64 = fileBase64.replace('data:', '').replace(/^.+,/, '');
            form.setValue('business_license', base64);
            form.setValue('business_license_name', file?.name);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-5 space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="!font-light text-white">
                                    Full Company Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-full border-white bg-transparent text-white"
                                        placeholder="Company LLC"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-end space-x-1 !font-light text-white">
                                    <Mail size={18} />
                                    <span>Email</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-full border-white bg-transparent text-white"
                                        placeholder="ellamartin@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-end space-x-1 !font-light text-white">
                                    <Key size={18} />
                                    <span>Password</span>
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        className="rounded-full border-white bg-transparent text-white"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-end space-x-1 !font-light text-white">
                                    <Key size={18} />
                                    <span>Confirm Password</span>
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        className="rounded-full border-white bg-transparent text-white"
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="business_license"
                        render={() => (
                            <FormItem>
                                <FormLabel className="flex items-end space-x-1 !font-light text-white">
                                    <File size={18} />
                                    <span>Business Licence</span>
                                </FormLabel>
                                <FormControl>
                                    <label
                                        htmlFor="pdf-upload"
                                        className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-white transition-all hover:border-blue-500"
                                    >
                                        <Input
                                            id="pdf-upload"
                                            className="hidden"
                                            type="file"
                                            accept="application/pdf"
                                            multiple={false}
                                            onChange={handleFileChange}
                                        />
                                        <Upload className="h-8 w-8 text-gray-400" />
                                        <span className="mt-2 text-gray-400">
                                            {form.getValues(
                                                'business_license_name'
                                            ) || 'Upload Licence'}
                                        </span>
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <FormLabel className="mb-2 flex items-end space-x-1 !font-light text-white">
                            <MapPin size={18} />
                            <span>Location</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info
                                            className="text-blue-500"
                                            size={16}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-48 text-center">
                                        <p>
                                            If you are registering from outside
                                            of Canada, please enter the province
                                            and city that you are interested in.
                                            Services will be recommended
                                            accordingly.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </FormLabel>
                        <div className="mb-2 flex space-x-2">
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="rounded-full border-white bg-transparent text-white">
                                                    <SelectValue placeholder="Province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {dataState?.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="rounded-full border-white bg-transparent text-white">
                                                    <SelectValue placeholder="City" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {dataCity?.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="rounded-full border-white bg-transparent text-white"
                                            placeholder="Address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {isError && (
                        <ErrorMessage>
                            {error.response?.data?.message || 'Something Wrong'}
                        </ErrorMessage>
                    )}
                    <div className="text-center text-white">
                        By registering for an account, you agree to the{' '}
                        <Link className="font-semibold" href={'#'}>
                            Terms of Use
                        </Link>
                        . Please read our{' '}
                        <Link className="font-semibold" href={'#'}>
                            Privacy Policy
                        </Link>
                        .
                    </div>
                    <div className="flex w-full justify-center">
                        <Button
                            className="group relative rounded-xl px-6 py-3 !font-semibold text-white transition-all duration-300"
                            type="submit"
                            loading={isPending}
                        >
                            <span className="group-hover:opacity-300 absolute -inset-1 rounded-lg bg-blue-500 opacity-20 blur-sm transition-all duration-300"></span>
                            Sign Up
                        </Button>
                    </div>
                </form>
            </Form>

            {/* <TitleSeparator>Or With</TitleSeparator>
            <div className="flex flex-col justify-center space-y-4 text-center md:flex-row md:space-x-4 md:space-y-0">
                <Button variant={'outline'}>
                    <Image
                        src={'/icons/google.png'}
                        alt="google"
                        width={20}
                        className="mr-2"
                        height={20}
                    />
                    Sign Up with Google
                </Button>
            </div> */}
        </div>
    );
}
