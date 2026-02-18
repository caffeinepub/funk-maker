import { useState } from 'react';
import { usePatternSession } from '../../state/usePatternSession';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Check, X } from 'lucide-react';

export default function PatternManager() {
  const { patterns, activePatternId, setActivePattern, createNewPattern, renamePattern } = usePatternSession();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const activePattern = patterns.find((p) => p.id === activePatternId);

  const handleStartEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      renamePattern(editingId, editName.trim());
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Patterns</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pattern selector */}
        <div className="flex gap-2">
          <Select value={activePatternId.toString()} onValueChange={(v) => setActivePattern(Number(v))}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {patterns.map((pattern) => (
                <SelectItem key={pattern.id} value={pattern.id.toString()}>
                  {pattern.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={createNewPattern} size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Rename current pattern */}
        {activePattern && (
          <div className="flex gap-2 items-center">
            {editingId === activePattern.id ? (
              <>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="flex-1"
                  autoFocus
                />
                <Button onClick={handleSaveEdit} size="icon" variant="ghost">
                  <Check className="h-4 w-4" />
                </Button>
                <Button onClick={handleCancelEdit} size="icon" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-muted-foreground">
                  Rename: <span className="font-medium text-foreground">{activePattern.name}</span>
                </span>
                <Button
                  onClick={() => handleStartEdit(activePattern.id, activePattern.name)}
                  size="icon"
                  variant="ghost"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
