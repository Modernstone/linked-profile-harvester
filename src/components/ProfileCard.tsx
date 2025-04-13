
import React from "react";
import { LinkedInProfile } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ProfileCardProps {
  profile: LinkedInProfile;
  onDelete?: (id: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onDelete }) => {
  return (
    <Card className="profile-card w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-start">
          <span>{profile.name}</span>
        </CardTitle>
        <div className="text-sm text-muted-foreground flex items-center">
          <Briefcase className="h-3.5 w-3.5 mr-1 text-linkedin-blue" />
          {profile.headline}
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1 text-linkedin-blue" />
          {profile.location}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {profile.skills && profile.skills.length > 0 ? (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Skills:</p>
            <div className="flex flex-wrap gap-1">
              {profile.skills.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {profile.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{profile.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No skills listed</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(profile.timestamp, { addSuffix: true })}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 px-2"
            onClick={() => window.open(profile.profileUrl, "_blank")}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          {onDelete && (
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-7 px-2"
              onClick={() => onDelete(profile.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
