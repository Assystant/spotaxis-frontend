
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDown, Settings, Trash2 } from 'lucide-react';
import { type WorkflowBlock } from '@/contexts/WorkflowContext';
import { ActionConfigDialog } from './ActionConfigDialog';

interface CanvasAreaProps {
  triggerBlock: WorkflowBlock | null;
  actionBlocks: WorkflowBlock[];
  onUpdateActionBlocks: (blocks: WorkflowBlock[]) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  triggerBlock,
  actionBlocks,
  onUpdateActionBlocks,
}) => {
  const [configuring, setConfiguring] = useState<WorkflowBlock | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // In a real implementation, you'd extract the action data from the drag event
    // For now, we'll create a mock action block
    const newAction: WorkflowBlock = {
      id: `action_${Date.now()}`,
      type: 'action',
      actionType: 'send_email', // This would come from drag data
      config: {},
      position: { x: 100, y: 200 + (actionBlocks.length * 150) },
      isConfigured: false,
    };
    
    onUpdateActionBlocks([...actionBlocks, newAction]);
    setConfiguring(newAction);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleConfigureAction = (block: WorkflowBlock) => {
    setConfiguring(block);
  };

  const handleSaveActionConfig = (config: Record<string, any>) => {
    if (!configuring) return;

    const updatedBlocks = actionBlocks.map(block =>
      block.id === configuring.id
        ? { ...block, config, isConfigured: true }
        : block
    );
    
    onUpdateActionBlocks(updatedBlocks);
    setConfiguring(null);
  };

  const handleDeleteAction = (blockId: string) => {
    const updatedBlocks = actionBlocks.filter(block => block.id !== blockId);
    onUpdateActionBlocks(updatedBlocks);
  };

  const renderWorkflowBlock = (block: WorkflowBlock, index: number) => (
    <div key={block.id} className="relative">
      <Card className={`w-64 ${!block.isConfigured ? 'border-orange-300 bg-orange-50' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant={block.type === 'trigger' ? 'default' : 'secondary'}>
              {block.type === 'trigger' ? 'Trigger' : 'Action'}
            </Badge>
            {block.type === 'action' && (
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleConfigureAction(block)}
                >
                  <Settings className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteAction(block.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
          <CardTitle className="text-sm">
            {block.type === 'trigger' 
              ? block.eventType?.replace('_', ' ').toUpperCase()
              : block.actionType?.replace('_', ' ').toUpperCase()
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {block.isConfigured ? (
              <span className="text-green-600">✓ Configured</span>
            ) : (
              <span className="text-orange-600">⚠ Needs configuration</span>
            )}
          </div>
          {block.config.name && (
            <div className="text-sm mt-1">{block.config.name}</div>
          )}
        </CardContent>
      </Card>

      {/* Connector line to next block */}
      {(block.type === 'trigger' && actionBlocks.length > 0) || 
       (block.type === 'action' && index < actionBlocks.length - 1) ? (
        <div className="flex justify-center mt-4 mb-4">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="h-full p-6 bg-gray-50/50">
      <div 
        className="min-h-full border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!triggerBlock ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">No trigger configured</div>
              <div className="text-sm">Configure a trigger in the sidebar to get started</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {renderWorkflowBlock(triggerBlock, -1)}
            
            {actionBlocks.map((block, index) => renderWorkflowBlock(block, index))}
            
            {actionBlocks.length === 0 && (
              <div className="w-64 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-muted-foreground">
                <div className="text-sm">Drag actions here from the sidebar</div>
              </div>
            )}
          </div>
        )}
      </div>

      {configuring && (
        <ActionConfigDialog
          block={configuring}
          open={!!configuring}
          onOpenChange={() => setConfiguring(null)}
          onSave={handleSaveActionConfig}
        />
      )}
    </div>
  );
};
