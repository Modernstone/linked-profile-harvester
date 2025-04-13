
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus, CheckCircle } from "lucide-react";
import { saveProfile } from "@/services/profileService";
import { LinkedInProfile } from "@/types/profile";
import { useToast } from "@/components/ui/use-toast";

const ProfileExtractor = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const extractProfile = async () => {
    try {
      setIsExtracting(true);
      setIsSuccess(false);
      
      // Check if current tab is LinkedIn
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];
      
      if (!currentTab?.url?.includes('linkedin.com')) {
        toast({
          title: "Not a LinkedIn page",
          description: "Please navigate to a LinkedIn profile page to extract data.",
          variant: "destructive",
        });
        setIsExtracting(false);
        return;
      }
      
      // Extract profile data from content script
      chrome.tabs.sendMessage(
        currentTab.id as number,
        { action: "extractProfile" },
        async (response) => {
          if (response?.success && response.profile) {
            // Save to Firebase
            await saveProfile(response.profile);
            
            setIsSuccess(true);
            toast({
              title: "Profile extracted!",
              description: `Successfully saved ${response.profile.name}'s profile.`,
            });
          } else {
            toast({
              title: "Extraction failed",
              description: "Could not extract profile data. Make sure you're on a LinkedIn profile page.",
              variant: "destructive",
            });
          }
          setIsExtracting(false);
        }
      );
    } catch (error) {
      console.error("Error in profile extraction:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during extraction.",
        variant: "destructive",
      });
      setIsExtracting(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      <h2 className="text-xl font-semibold">Extract Profile</h2>
      <p className="text-sm text-muted-foreground text-center mb-2">
        Navigate to a LinkedIn profile and click below to extract data
      </p>
      
      <Button
        onClick={extractProfile}
        disabled={isExtracting}
        className="w-full"
        variant={isSuccess ? "outline" : "default"}
      >
        {isExtracting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Extracting...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Profile Saved
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4 mr-2" />
            Extract Profile
          </>
        )}
      </Button>
    </div>
  );
};

export default ProfileExtractor;
