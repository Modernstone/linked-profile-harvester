
// This file provides TypeScript type definitions for the Chrome Extension API
/// <reference types="chrome" />

// Ensure Chrome namespace is available globally
declare namespace chrome {
  export = chrome;
}

// Make chrome available globally
declare const chrome: typeof chrome;
