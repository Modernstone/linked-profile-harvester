
import { db } from "@/lib/firebase";
import { LinkedInProfile } from "@/types/profile";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  doc,
  orderBy,
  limit,
  serverTimestamp,
  getDoc
} from "firebase/firestore";

const PROFILES_COLLECTION = "linkedinProfiles";

export async function saveProfile(profile: LinkedInProfile): Promise<string> {
  try {
    // Check if profile already exists
    const profileQuery = query(
      collection(db, PROFILES_COLLECTION),
      where("profileUrl", "==", profile.profileUrl)
    );
    
    const existingProfiles = await getDocs(profileQuery);
    
    if (!existingProfiles.empty) {
      return existingProfiles.docs[0].id; // Return existing profile ID
    }
    
    // Add new profile with server timestamp
    const docRef = await addDoc(collection(db, PROFILES_COLLECTION), {
      ...profile,
      createdAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
}

export async function getAllProfiles(): Promise<LinkedInProfile[]> {
  try {
    const profilesQuery = query(
      collection(db, PROFILES_COLLECTION),
      orderBy("timestamp", "desc")
    );
    
    const querySnapshot = await getDocs(profilesQuery);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        headline: data.headline,
        location: data.location,
        profileUrl: data.profileUrl,
        skills: data.skills,
        timestamp: data.timestamp
      } as LinkedInProfile;
    });
  } catch (error) {
    console.error("Error getting profiles:", error);
    return [];
  }
}

export async function getRecentProfiles(profileCount: number = 5): Promise<LinkedInProfile[]> {
  try {
    const profilesQuery = query(
      collection(db, PROFILES_COLLECTION),
      orderBy("timestamp", "desc"),
      limit(profileCount)
    );
    
    const querySnapshot = await getDocs(profilesQuery);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        headline: data.headline,
        location: data.location,
        profileUrl: data.profileUrl,
        skills: data.skills,
        timestamp: data.timestamp
      } as LinkedInProfile;
    });
  } catch (error) {
    console.error("Error getting recent profiles:", error);
    return [];
  }
}

export async function deleteProfile(profileId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, PROFILES_COLLECTION, profileId));
    return true;
  } catch (error) {
    console.error("Error deleting profile:", error);
    return false;
  }
}

export async function getProfilesCount(): Promise<number> {
  try {
    const querySnapshot = await getDocs(collection(db, PROFILES_COLLECTION));
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting profiles count:", error);
    return 0;
  }
}
