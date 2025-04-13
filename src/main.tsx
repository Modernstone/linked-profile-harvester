
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// For Chrome extension, we don't need BrowserRouter as
// we're running in a popup with no navigation
createRoot(document.getElementById("root")!).render(<App />);
