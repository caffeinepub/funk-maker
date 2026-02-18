export default function HelpPanel() {
  return (
    <div className="space-y-4 text-sm">
      <section>
        <h3 className="font-semibold text-base mb-2">Creating Beats</h3>
        <ul className="space-y-1 list-disc list-inside text-muted-foreground">
          <li>Click on grid cells to toggle steps on/off for each instrument track</li>
          <li>Use the Play button to hear your beat loop</li>
          <li>Adjust BPM (tempo) using the slider or input field</li>
          <li>Control volume and mute for each track individually</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base mb-2">Managing Patterns</h3>
        <ul className="space-y-1 list-disc list-inside text-muted-foreground">
          <li>Switch between patterns using the pattern selector</li>
          <li>Create new patterns with the "New Pattern" button</li>
          <li>Rename patterns by clicking the edit icon</li>
          <li>Each pattern saves its own grid and BPM settings</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base mb-2">Saving & Loading</h3>
        <ul className="space-y-1 list-disc list-inside text-muted-foreground">
          <li>Sign in to save your patterns to the cloud</li>
          <li>Saved patterns persist across sessions and devices</li>
          <li>Load previously saved patterns from your library</li>
          <li>Your patterns are private and only accessible to you</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base mb-2">Tips</h3>
        <ul className="space-y-1 list-disc list-inside text-muted-foreground">
          <li>Start with a simple kick pattern on beats 1 and 3</li>
          <li>Add snare on beats 2 and 4 for a classic groove</li>
          <li>Use hi-hats for rhythm and texture</li>
          <li>Experiment with different BPM settings for various styles</li>
        </ul>
      </section>
    </div>
  );
}
