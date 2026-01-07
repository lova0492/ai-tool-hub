import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import ContentSections from './components/ContentSections';
import Footer from './components/Footer';
import ToolModal from './components/ToolModal';
import LoginModal from './components/LoginModal';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export type ToolType = 'video' | 'avatar' | 'post' | 'message' | 'imagePrompt' | 'caption' | 'thumbnail' | 'script' | null;

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Load login state from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('ai-tools-username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleToolOpen = (tool: ToolType) => {
    setActiveTool(tool);
  };

  const handleToolClose = () => {
    setActiveTool(null);
  };

  const navigateToPage = (page: 'home' | 'privacy' | 'terms') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    if (!username) {
      setIsLoginModalOpen(true);
    } else {
      // If already logged in, scroll to tools section
      const toolsSection = document.getElementById('tools');
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogin = (user: string) => {
    setUsername(user);
    localStorage.setItem('ai-tools-username', user);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('ai-tools-username');
  };

  if (currentPage === 'privacy') {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="min-h-screen bg-background">
          <Header 
            onNavigate={navigateToPage} 
            currentPage={currentPage}
            username={username}
            onLogout={handleLogout}
            onGetStarted={handleGetStarted}
          />
          <PrivacyPage onNavigate={navigateToPage} />
          <Footer onNavigate={navigateToPage} />
        </div>
      </ThemeProvider>
    );
  }

  if (currentPage === 'terms') {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="min-h-screen bg-background">
          <Header 
            onNavigate={navigateToPage} 
            currentPage={currentPage}
            username={username}
            onLogout={handleLogout}
            onGetStarted={handleGetStarted}
          />
          <TermsPage onNavigate={navigateToPage} />
          <Footer onNavigate={navigateToPage} />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background">
        <Header 
          onNavigate={navigateToPage} 
          currentPage={currentPage}
          username={username}
          onLogout={handleLogout}
          onGetStarted={handleGetStarted}
        />
        
        <main>
          <Hero onGetStarted={handleGetStarted} onToolOpen={handleToolOpen} />
          <ToolsGrid onToolOpen={handleToolOpen} />
          <ContentSections />
        </main>

        <Footer onNavigate={navigateToPage} />

        <ToolModal 
          tool={activeTool} 
          isOpen={activeTool !== null} 
          onClose={handleToolClose} 
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
