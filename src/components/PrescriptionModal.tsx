import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type PrescriptionItem = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
};

export default function PrescriptionModal({ onSave, medications }: { onSave: (item: PrescriptionItem) => void; medications: string[] }) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");

  const disabled = !name || !dosage || !frequency || !duration;

  return (
    <DialogContent aria-label="Add Prescription">
      <DialogHeader>
        <DialogTitle>Add Prescription</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label htmlFor="med">Medicine</Label>
          <Select value={name || undefined} onValueChange={setName}>
            <SelectTrigger id="med" aria-label="Select medicine">
              <SelectValue placeholder="Select medicine" />
            </SelectTrigger>
            <SelectContent>
              {medications.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dosage">Dosage</Label>
          <Input id="dosage" aria-label="Dosage" placeholder="10mg" value={dosage} onChange={(e) => setDosage(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="freq">Frequency</Label>
          <Input id="freq" aria-label="Frequency" placeholder="Once daily" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input id="duration" aria-label="Duration" placeholder="7 days" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea id="instructions" aria-label="Instructions" placeholder="Take with food, avoid alcohol" value={instructions} onChange={(e) => setInstructions(e.target.value)} className="min-h-[80px]" />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave({ name, dosage, frequency, duration, instructions })} disabled={disabled} className="gradient-primary" aria-label="Save prescription">Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}
