import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import CommunityFollowers from './CommunityFollowers';
import CommunityEvents from './CommunityEvents';
import CommunityFollowers from './CommunityFollowers';

export default function TabSwitcher({ id }: { id: string | undefined }) {
    return (
        <div className="w-full">
            <Tabs defaultValue="events" className="">
                <TabsList className="mb-4">
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="followers">Followers</TabsTrigger>
                </TabsList>
                <TabsContent value="events">
                    <CommunityEvents community_id={id} />
                </TabsContent>
                <TabsContent value="followers">
                    <CommunityFollowers id={id} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
