'use client';
import CardDarkNeonGlow from "@/components/base/Card/CardDarkNeonGlow";
import LoadingPage from "@/components/base/Loading/LoadingPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBuyPlan } from "@/feature/plans/useBuyPlan";
import { useFetchPlans } from "@/feature/plans/useFetchPlans";
import { IPlan } from "@/types/base/plans";
import { Fragment, useState } from "react";
import { useToast } from '@/components/ui/use-toast';

export default function Page(){
    const { toast } = useToast();
    const { data, isLoading } = useFetchPlans();
    const mappedPlans = data?.reduce((acc, item) => {
        acc[item.credits] = item;
        return acc;
    }, {} as Record<string, IPlan>) || {};

    const [isShowForm, setIsShowForm] = useState(false);
    const [isNumber, setIsNumber] = useState(true);
    const [quantity, setQuantity] = useState("");
    const { mutate, isPending } = useBuyPlan({
        onSuccess: (data) => {
            console.log(data)
            window.location.href = data.data.data.url;
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: error.response?.data.message,
            });
        },
    });

    const buyStaticPlan = (plan_id: string) => {
        mutate({
            plan_id,
            qty: 1
        });
    };

    const buyDynamicPlan = (plan_id: string) => {
        mutate({
            plan_id,
            qty: parseInt(quantity),
        });
    };

    const handleChange = (e: any) => {
        const newValue = e.target.value;
        if(!isNaN(newValue)) {
            setQuantity(newValue)
            setIsNumber(true)
        } else {
            setIsNumber(false)
        }
    };
    return (
        <div className="flex-1 px-6">
            {isLoading && <LoadingPage/>}

            {!isLoading && data && (
                <Fragment>
                    <div className="mb-5">
                        <div className="text-center">
                            <h1 className="space-x-2 text-4xl">
                                <p>Plans and Pricing</p>
                            </h1>
                            <div className="mx-auto w-6/12 text-muted-foreground">
                                <p>Want to promote yourself? We've got you covered with simple and intuitive pricing for every owner.</p>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl mb-2 font-bold">Buy Credits</h2>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        {mappedPlans && mappedPlans['150'] && (
                            <CardDarkNeonGlow variant="silver">
                                <p className="text-2xl font-semibold mb-5">{mappedPlans['150'].name}</p>
                                <p className="text-2xl font-semibold">${mappedPlans['150'].price}*</p>
                                <p className="text-lg text-muted-foreground mb-5">{mappedPlans['150'].credits} Credits</p>
                                <Button disabled={isPending} className="bg-blue-500 rounded-xl" onClick={() => buyStaticPlan(mappedPlans['150'].id)}>Buy</Button>
                                <p className="text-sm text-muted-foreground mt-10">*transaction tax may apply</p>
                            </CardDarkNeonGlow>
                        )}

                        {mappedPlans && mappedPlans['500'] && (
                            <CardDarkNeonGlow variant="gold">
                                <p className="text-2xl font-semibold mb-5">{mappedPlans['500'].name}</p>
                                <p className="text-2xl font-semibold">${mappedPlans['500'].price}*</p>
                                <p className="text-lg text-muted-foreground mb-5">{mappedPlans['500'].credits} Credits</p>
                                <Button disabled={isPending} className="bg-blue-500 rounded-xl" onClick={() => buyStaticPlan(mappedPlans['150'].id)}>Buy</Button>
                                <p className="text-sm text-muted-foreground mt-10">*transaction tax may apply</p>
                            </CardDarkNeonGlow>
                        )}
                    </div>
                    {mappedPlans && mappedPlans['1'] && (
                        <CardDarkNeonGlow>
                            <p className="text-2xl font-semibold mb-5">Grow with Crow Package</p>
                            <p className="text-2xl font-semibold">${mappedPlans['1'].price}*</p>
                            <p className="text-lg text-muted-foreground mb-5">{mappedPlans['1'].credits} Credit</p>
                            {isShowForm ? (
                                <div>
                                    <div className="flex space-x-2">
                                        <Input
                                            className="w-2/12 bg-transparent"
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="Insert Quantity"
                                            value={quantity}
                                            onChange={handleChange}
                                        />
                                        
                                        <Button
                                            className="bg-blue-500 rounded-xl"
                                            loading={isPending}
                                            onClick={() => buyDynamicPlan(mappedPlans['1'].id)}
                                        >
                                            Buy!
                                        </Button>
                                        <Button
                                            className="rounded-xl"
                                            onClick={() => {setIsShowForm(false); setQuantity("")}}
                                            disabled={isPending}
                                            variant={"ghost"}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                    {!isNumber && (
                                        <p className="mt-1 text-red-500 font-semibold text-sm">Number required</p>
                                    )}
                                </div>
                            ) : (
                                <Button disabled={isPending} className="bg-blue-500 rounded-xl" onClick={() => setIsShowForm(true)}>Set Quantity</Button>
                            )}
                            <p className="text-sm text-muted-foreground mt-10">*transaction tax may apply</p>
                        </CardDarkNeonGlow>
                    )}   
                </Fragment>
            )}
        </div>
    )
}