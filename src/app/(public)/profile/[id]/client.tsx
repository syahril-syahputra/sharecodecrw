import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IOtherUser } from '@/types/user';
import React from 'react';
import TabEvents from './TabEvents';
import TabCommunities from './TabCommunities';
import TabCommunityTutors from './TabCommunityTutors';
import TabInterest from './TabInterest';

export default function ProfileUser(props: { data: IOtherUser }) {
    const { data } = props;
    return (
        <div>
            <div className="flex space-x-4 ">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={data.profile_picture_url || ''} />
                    <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            {data.first_name} {data.last_name}
                        </h3>
                        <p>
                            {data.city || 'City'}, {data.province || 'Province'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold">About me</h3>
                        <p>{data.about}</p>
                    </div>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="w-full">
                <Tabs defaultValue="events" className="">
                    <TabsList className="mb-4 space-x-8 bg-background">
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="communities">
                            Communities
                        </TabsTrigger>
                        <TabsTrigger value="community-tutors">
                            Community Tutors
                        </TabsTrigger>
                        <TabsTrigger value="interests">Interest</TabsTrigger>
                    </TabsList>
                    <TabsContent value="events">
                        <TabEvents id={data.id} />
                    </TabsContent>
                    <TabsContent value="communities">
                        <TabCommunities id={data.id} />
                    </TabsContent>
                    <TabsContent value="community-tutors">
                        <TabCommunityTutors id={data.id} />
                    </TabsContent>
                    <TabsContent value="interests">
                        <TabInterest id={data.id} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
