import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Button } from './components/ui/button.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
    <Button variant="link" className="fixed bottom-4 right-4">
      <a href="https://github.com/HoverBaum/gradientMesh/tree/main">GitHub</a>
    </Button>
  </StrictMode>
)
