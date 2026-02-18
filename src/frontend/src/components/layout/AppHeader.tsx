import { HelpCircle } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import HelpPanel from '../help/HelpPanel';

export default function AppHeader() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/assets/generated/funk-maker-logo.dim_512x256.png"
              alt="Funk Maker"
              className="h-10 w-auto"
            />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Help button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>How to Use Funk Maker</DialogTitle>
                </DialogHeader>
                <HelpPanel />
              </DialogContent>
            </Dialog>

            {/* User info */}
            {isAuthenticated && userProfile && (
              <div className="text-sm text-muted-foreground hidden sm:block">
                {userProfile.name}
              </div>
            )}

            {/* Login button */}
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
}
