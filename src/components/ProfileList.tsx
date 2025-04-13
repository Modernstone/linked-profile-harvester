
import React, { useState, useEffect } from "react";
import { 
  getAllProfiles, 
  getRecentProfiles, 
  deleteProfile 
} from "@/services/profileService";
import { LinkedInProfile } from "@/types/profile";
import ProfileCard from "./ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const ProfileList = () => {
  const [profiles, setProfiles] = useState<LinkedInProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("recent");
  const { toast } = useToast();

  useEffect(() => {
    loadProfiles();
  }, [tab]);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const loadedProfiles = 
        tab === "recent" 
          ? await getRecentProfiles(5) 
          : await getAllProfiles();
      
      setProfiles(loadedProfiles);
    } catch (error) {
      console.error("Error loading profiles:", error);
      toast({
        title: "Error",
        description: "Failed to load profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    try {
      await deleteProfile(profileId);
      setProfiles(profiles.filter(profile => profile.id !== profileId));
      toast({
        title: "Profile deleted",
        description: "The profile was successfully removed",
      });
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast({
        title: "Error",
        description: "Failed to delete profile",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="recent" value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="all">All Profiles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-4">
          <h2 className="text-lg font-semibold mb-4">Recently Extracted</h2>
          {renderProfilesList()}
        </TabsContent>
        
        <TabsContent value="all" className="mt-4">
          <h2 className="text-lg font-semibold mb-4">All Profiles</h2>
          {renderProfilesList()}
        </TabsContent>
      </Tabs>
    </div>
  );

  function renderProfilesList() {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-linkedin-blue" />
        </div>
      );
    }

    if (profiles.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No profiles found. Extract some profiles to see them here.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {profiles.map(profile => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            onDelete={handleDeleteProfile} 
          />
        ))}
      </div>
    );
  }
};

export default ProfileList;
