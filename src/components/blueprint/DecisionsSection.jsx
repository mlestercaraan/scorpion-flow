import React, { useState } from 'react';
import { SectionHeader } from './ICPSection';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const INITIAL_ROWS = [
  { id: 1, decision: 'Confirm final lead pipeline stages', owner: '', priority: 'High', due: '', status: 'Open' },
  { id: 2, decision: 'Collect ICP doc and sales/marketing assets', owner: '', priority: 'High', due: '', status: 'Open' },
  { id: 3, decision: 'Build QBR automation plan', owner: '', priority: 'Medium', due: '', status: 'Open' },
];

export default function DecisionsSection() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [nextId, setNextId] = useState(4);

  const updateRow = (id, field, value) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRow = () => {
    setRows([...rows, { id: nextId, decision: '', owner: '', priority: 'Medium', due: '', status: 'Open' }]);
    setNextId(nextId + 1);
  };

  const deleteRow = (id) => {
    setRows(rows.filter(r => r.id !== id));
  };

  return (
    <section>
      <SectionHeader number="08" title="Live Decisions & Action Items" description="Live action items and decisions captured during this session. Track owner, priority, due date, and status." />

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-2.5 bg-muted/60 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
          <div className="col-span-4">Decision / Action</div>
          <div className="col-span-2">Owner</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Due Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 px-4 py-3 items-center">
              <div className="md:col-span-4">
                <Input
                  value={row.decision}
                  onChange={(e) => updateRow(row.id, 'decision', e.target.value)}
                  placeholder="Decision or action item..."
                  className="h-8 text-sm border-0 bg-transparent shadow-none focus-visible:ring-1 px-0 md:px-2"
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  value={row.owner}
                  onChange={(e) => updateRow(row.id, 'owner', e.target.value)}
                  placeholder="Owner..."
                  className="h-8 text-sm border-0 bg-transparent shadow-none focus-visible:ring-1 px-0 md:px-2"
                />
              </div>
              <div className="md:col-span-2">
                <Select value={row.priority} onValueChange={(v) => updateRow(row.id, 'priority', v)}>
                  <SelectTrigger className="h-8 text-xs border-0 bg-transparent shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">🔴 High</SelectItem>
                    <SelectItem value="Medium">🟡 Medium</SelectItem>
                    <SelectItem value="Low">🟢 Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Input
                  type="date"
                  value={row.due}
                  onChange={(e) => updateRow(row.id, 'due', e.target.value)}
                  className="h-8 text-xs border-0 bg-transparent shadow-none focus-visible:ring-1 px-0 md:px-2"
                />
              </div>
              <div className="md:col-span-1">
                <Select value={row.status} onValueChange={(v) => updateRow(row.id, 'status', v)}>
                  <SelectTrigger className="h-8 text-xs border-0 bg-transparent shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1 flex justify-end">
                <button
                  onClick={() => deleteRow(row.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add row */}
        <div className="px-4 py-3 border-t border-border">
          <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground" onClick={addRow}>
            <Plus className="w-3.5 h-3.5" />
            Add row
          </Button>
        </div>
      </div>
    </section>
  );
}