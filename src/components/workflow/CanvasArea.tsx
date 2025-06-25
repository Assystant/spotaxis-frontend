
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDown, Settings, Trash2, GripVertical } from 'lucide-react';
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
  const [dragging, setDragging] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const actionData = e.dataTransfer.getData('application/json');
    
    if (actionData) {
      try {
        const parsedAction = JSON.parse(actionData);
        const newAction: WorkflowBlock = {
          id: `action_${Date.now()}`,
          type: 'action',
          actionType: parsedAction.id,
          config: {},
          position: { x: 100, y: 200 + (actionBlocks.length * 150) },
          isConfigured: false,
        };
        
        onUpdateActionBlocks([...actionBlocks, newAction]);
        setConfiguring(newAction);
      } catch (error) {
        console.error('Failed to parse action data:', error);
      }
    }
    setDragging(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging('canvas');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setDragging(null);
    }
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

  const moveAction = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...actionBlocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);
    onUpdateActionBlocks(newBlocks);
  };

  const getBlockTitle = (block: WorkflowBlock) => {
    if (block.type === 'trigger') {
      return block.eventType?.replace('_', ' ').toUpperCase() || 'TRIGGER';
    }
    return block.actionType?.replace('_', ' ').toUpperCase() || 'ACTION';
  };

  const getBlockDescription = (block: WorkflowBlock) => {
    if (block.config.name) return block.config.name;
    if (block.config.subject) return block.config.subject;
    if (block.config.title) return block.config.title;
    return block.isConfigured ? 'Configured' : 'Needs configuration';
  };

  const renderWorkflowBlock = (block: WorkflowBlock, index: number) => (
    <div key={block.id} className="relative group">
      <Card className={`w-80 mx-auto transition-all ${
        !block.isConfigured 
          ? 'border-orange-300 bg-orange-50 shadow-orange-100' 
          : 'border-green-300 bg-green-50 shadow-green-100'
      }`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant={block.type === 'trigger' ? 'default' : 'secondary'}>
              {block.type === 'trigger' ? 'Trigger' : 'Action'}
            </Badge>
            <div className="flex items-center space-x-1">
              {block.type === 'action' && (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <GripVertical className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleConfigureAction(block)}
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                    onClick={() => handleDeleteAction(block.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
          <CardTitle className="text-sm font-medium">
            {getBlockTitle(block)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xs">
            {block.isConfigured ? (
              <span className="text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Configured
              </span>
            ) : (
              <span className="text-orange-600 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Needs configuration
              </span>
            )}
          </div>
          <div className="text-sm mt-2 text-muted-foreground">
            {getBlockDescription(block)}
          </div>
        </CardContent>
      </Card>

      {/* Connector line to next block */}
      {(block.type === 'trigger' && actionBlocks.length > 0) || 
       (block.type === 'action' && index < actionBlocks.length - 1) ? (
        <div className="flex justify-center mt-4 mb-4">
          <div className="w-px h-8 bg-border"></div>
          <ArrowDown className="w-5 h-5 text-muted-foreground -mt-2" />
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="h-full p-6 bg-gray-50/50 overflow-y-auto">
      <div 
        ref={dropZoneRef}
        className={`min-h-full border-2 border-dashed rounded-lg p-8 bg-white transition-colors ${
          dragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!triggerBlock ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">No trigger configured</div>
              <div className="text-sm">Configure a trigger in the sidebar to get started</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-0">
            {renderWorkflowBlock(triggerBlock, -1)}
            
            {actionBlocks.map((block, index) => renderWorkflowBlock(block, index))}
            
            {/* Drop zone for new actions */}
            <div className={`w-80 mx-auto p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground transition-colors ${
              dragging ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}>
              <div className="text-sm">
                {dragging ? 'Drop action here' : 'Drag actions here from the sidebar'}
              </div>
            </div>
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
