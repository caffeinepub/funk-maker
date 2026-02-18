import { ReactNode } from 'react';
import AppHeader from './AppHeader';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/funk-background-tile.dim_512x512.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <AppHeader />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/50 mt-12">
          <p>
            © {new Date().getFullYear()} · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'funk-maker'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
