import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetAllPatterns, useSavePattern, useLoadPattern } from '../../hooks/useQueries';
import { usePatternSession } from '../../state/usePatternSession';
import { patternToBackend, patternFromBackend } from '../../types/music';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function CloudSaveLoadPanel() {
  const { identity } = useInternetIdentity();
  const { data: savedPatterns, isLoading: loadingPatterns } = useGetAllPatterns();
  const savePatternMutation = useSavePattern();
  const loadPatternMutation = useLoadPattern();
  const { getActivePattern, loadPattern } = usePatternSession();
  const [selectedPatternName, setSelectedPatternName] = useState<string>('');

  const isAuthenticated = !!identity;
  const activePattern = getActivePattern();

  const handleSave = async () => {
    if (!activePattern) return;
    try {
      const backendPattern = patternToBackend(activePattern);
      await savePatternMutation.mutateAsync(backendPattern);
      toast.success('Pattern saved successfully!');
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save pattern');
    }
  };

  const handleLoad = async () => {
    if (!selectedPatternName) return;
    try {
      const backendPattern = await loadPatternMutation.mutateAsync(selectedPatternName);
      if (backendPattern) {
        const frontendPattern = patternFromBackend(backendPattern, ['kick', 'snare', 'hihat', 'clap']);
        loadPattern(frontendPattern);
        toast.success('Pattern loaded successfully!');
      } else {
        toast.error('Pattern not found');
      }
    } catch (error: any) {
      console.error('Load error:', error);
      toast.error(error.message || 'Failed to load pattern');
    }
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cloud Save & Load</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please sign in to save and load patterns from the cloud.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cloud Save & Load</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Save current pattern */}
        <div className="space-y-2">
          <Button
            onClick={handleSave}
            disabled={!activePattern || savePatternMutation.isPending}
            className="w-full gap-2"
          >
            <Save className="h-4 w-4" />
            {savePatternMutation.isPending ? 'Saving...' : 'Save Current Pattern'}
          </Button>
        </div>

        {/* Load saved pattern */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Select value={selectedPatternName} onValueChange={setSelectedPatternName} disabled={loadingPatterns}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a saved pattern" />
              </SelectTrigger>
              <SelectContent>
                {savedPatterns && savedPatterns.length > 0 ? (
                  savedPatterns.map((pattern) => (
                    <SelectItem key={pattern.name} value={pattern.name}>
                      {pattern.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No saved patterns
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button
              onClick={handleLoad}
              disabled={!selectedPatternName || loadPatternMutation.isPending}
              size="icon"
              variant="outline"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {savedPatterns && savedPatterns.length > 0 && (
          <p className="text-xs text-muted-foreground">{savedPatterns.length} pattern(s) saved</p>
        )}
      </CardContent>
    </Card>
  );
}
