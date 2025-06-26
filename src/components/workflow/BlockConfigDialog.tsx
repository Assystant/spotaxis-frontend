
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkflow, type WorkflowBlock } from '@/contexts/WorkflowContext';

interface BlockConfigDialogProps {
  block: WorkflowBlock;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: Record<string, any>) => void;
}

export const BlockConfigDialog: React.FC<BlockConfigDialogProps> = ({
  block,
  open,
  onOpenChange,
  onSave,
}) => {
  const { getActionType, getConditionalBranch } = useWorkflow();
  const [config, setConfig] = useState<Record<string, any>>(block.config || {});

  useEffect(() => {
    setConfig(block.config || {});
  }, [block]);

  const handleSave = () => {
    onSave(config);
    onOpenChange(false);
  };

  const handleConfigChange = (paramId: string, value: any) => {
    setConfig(prev => ({ ...prev, [paramId]: value }));
  };

  const renderParameterField = (param: any, value: any) => {
    switch (param.type) {
      case 'select':
        return (
          <Select value={value || ''} onValueChange={(v) => handleConfigChange(param.id, v)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${param.name}`} />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => handleConfigChange(param.id, e.target.value)}
            placeholder={param.placeholder}
            rows={4}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => handleConfigChange(param.id, e.target.value)}
            placeholder={param.placeholder}
          />
        );
      case 'email':
        return (
          <Input
            type="email"
            value={value || ''}
            onChange={(e) => handleConfigChange(param.id, e.target.value)}
            placeholder={param.placeholder}
          />
        );
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleConfigChange(param.id, e.target.value)}
            placeholder={param.placeholder}
          />
        );
    }
  };

  const getBlockData = () => {
    if (block.type === 'action' && block.actionType) {
      return getActionType(block.actionType);
    } else if (block.type === 'branch' && block.branchType) {
      return getConditionalBranch(block.branchType);
    }
    return null;
  };

  const blockData = getBlockData();
  
  const isValid = () => {
    if (!blockData) return false;
    return blockData.parameters.every((param: any) => 
      !param.required || (config[param.id] !== undefined && config[param.id] !== '')
    );
  };

  const getBlockTypeLabel = () => {
    if (block.type === 'action') return 'Action';
    if (block.type === 'branch') return 'Branch';
    return 'Block';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Configure {blockData?.name || getBlockTypeLabel()}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {blockData?.parameters.map((param: any) => (
            <div key={param.id}>
              <Label htmlFor={param.id}>
                {param.name} {param.required && <span className="text-red-500">*</span>}
              </Label>
              {renderParameterField(param, config[param.id])}
            </div>
          ))}
          {!blockData && (
            <div className="text-sm text-muted-foreground">
              No configuration options available for this block.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid()}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
