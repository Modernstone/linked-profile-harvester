
import { LinkedInProfile } from "../types/profile";

function extractProfileData(): LinkedInProfile | null {
  try {
    // Check if we're on a profile page
    if (!window.location.href.includes('/in/')) {
      console.log('Not on a LinkedIn profile page');
      return null;
    }

    // Extract name
    const nameElement = document.querySelector('.text-heading-xlarge');
    const name = nameElement ? nameElement.textContent?.trim() : '';
    
    // Extract headline
    const headlineElement = document.querySelector('.text-body-medium');
    const headline = headlineElement ? headlineElement.textContent?.trim() : '';
    
    // Extract location
    const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
    const location = locationElement ? locationElement.textContent?.trim() : '';
    
    // Extract profile URL
    const profileUrl = window.location.href.split('?')[0];
    
    // Extract skills
    const skills: string[] = [];
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
      const skillElements = skillsSection.querySelectorAll('.display-flex.flex-row.justify-space-between');
      skillElements.forEach(element => {
        const skillName = element.querySelector('.display-flex.flex-column.full-width')?.textContent?.trim();
        if (skillName) skills.push(skillName);
      });
    }
    
    // Alternative skill extraction if the above doesn't work
    if (skills.length === 0) {
      document.querySelectorAll('.pvs-list__outer-container .pvs-list .artdeco-list__item').forEach(item => {
        const skillText = item.textContent?.trim();
        if (skillText && !skillText.includes('Show more')) {
          skills.push(skillText.split('\n')[0].trim());
        }
      });
    }

    if (!name) {
      console.log('Could not extract profile name');
      return null;
    }
    
    const profile: LinkedInProfile = {
      id: '', // Will be assigned by Firebase
      name: name || 'Unknown Name',
      headline: headline || 'No Headline',
      location: location || 'Unknown Location',
      profileUrl: profileUrl,
      skills: skills,
      timestamp: Date.now()
    };
    
    return profile;
  } catch (error) {
    console.error('Error extracting LinkedIn profile:', error);
    return null;
  }
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'extractProfile') {
    const profileData = extractProfileData();
    sendResponse({ success: !!profileData, profile: profileData });
  }
  return true; // Keep the message channel open for async response
});

console.log('LinkedIn Profile Extractor content script loaded');
