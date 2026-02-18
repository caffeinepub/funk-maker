import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import SequencerWorkspace from './components/sequencer/SequencerWorkspace';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AppShell>
        <SequencerWorkspace />
      </AppShell>
      <ProfileSetupDialog />
      <Toaster />
    </ThemeProvider>
  );
}
