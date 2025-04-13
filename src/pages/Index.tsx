
import { useState } from "react";
import ProfileExtractor from "@/components/ProfileExtractor";
import ProfileList from "@/components/ProfileList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-[400px] w-[360px] p-4 flex flex-col">
      <div className="flex items-center justify-center mb-4">
        <div className="linkedin-blue-gradient p-1.5 rounded-md">
          <h1 className="text-white font-semibold px-2 text-lg">
            LinkedIn Profile Harvester
          </h1>
        </div>
      </div>
      
      <Tabs defaultValue="extract" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="extract">Extract</TabsTrigger>
          <TabsTrigger value="profiles">Profiles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="extract" className="flex-1 flex flex-col">
          <ProfileExtractor />
          
          <div className="mt-6 bg-linkedin-light p-4 rounded-md">
            <h3 className="text-sm font-semibold text-linkedin-dark mb-2">How to use</h3>
            <ol className="text-xs text-muted-foreground list-decimal pl-4 space-y-1">
              <li>Navigate to a LinkedIn profile page</li>
              <li>Click the "Extract Profile" button above</li>
              <li>The profile data will be saved to your database</li>
              <li>View saved profiles in the "Profiles" tab</li>
            </ol>
          </div>
        </TabsContent>
        
        <TabsContent value="profiles" className="flex-1">
          <ProfileList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
