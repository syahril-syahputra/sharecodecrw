import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommercialInterest from './commercial';
import CrownerInterest from './crowner';

export default function Page() {
    return (
        <div className="w-full">
            <Tabs defaultValue="crowner" className="">
                <TabsList className="mx-8 grid w-[400px] grid-cols-2">
                    <TabsTrigger value="crowner">Crowner</TabsTrigger>
                    <TabsTrigger value="commercial">Commercial</TabsTrigger>
                </TabsList>
                <TabsContent value="crowner" className="w-full">
                    <CrownerInterest />
                </TabsContent>
                <TabsContent value="commercial">
                    <CommercialInterest />
                </TabsContent>
            </Tabs>
        </div>
    );
}
