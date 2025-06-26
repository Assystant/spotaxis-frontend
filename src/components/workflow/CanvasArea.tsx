
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDown, Settings, Trash2, GripVertical } from 'lucide-react';
import { type WorkflowBlock } from '@/contexts/WorkflowContext';
import { BlockConfigDialog } from './BlockConfigDialog';

interface CanvasAreaProps {
  triggerBlock: WorkflowBlock | null;
  actionBlocks: WorkflowBlock[];
  onUpdateActionBlocks: (blocks: WorkflowBlock[]) => void;
  onTriggerDoubleClick?: () => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  triggerBlock,
  actionBlocks,
  onUpdateActionBlocks,
  onTriggerDoubleClick,
}) => {
  const [configuring, setConfiguring] = useState<WorkflowBlock | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [snapTarget, setSnapTarget] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const findSnapTarget = useCallback((x: number, y: number) => {
    const SNAP_DISTANCE = 100;
    
    // Check trigger block
    if (triggerBlock) {
      const triggerDistance = Math.sqrt(
        Math.pow(x - (triggerBlock.position.x + 160), 2) + 
        Math.pow(y - (triggerBlock.position.y + 80), 2)
      );
      if (triggerDistance < SNAP_DISTANCE) {
        return 'trigger';
      }
    }

    // Check action blocks
    for (let i = 0; i < actionBlocks.length; i++) {
      const block = actionBlocks[i];
      const distance = Math.sqrt(
        Math.pow(x - (block.position.x + 160), 2) + 
        Math.pow(y - (block.position.y + 80), 2)
      );
      if (distance < SNAP_DISTANCE) {
        return `action-${i}`;
      }
    }

    return null;
  }, [triggerBlock, actionBlocks]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const actionData = e.dataTransfer.getData('application/json');
    
    if (actionData) {
      try {
        const parsedAction = JSON.parse(actionData);
        const rect = dropZoneRef.current?.getBoundingClientRect();
        
        if (rect) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const target = findSnapTarget(x, y);
          
          if (target) {
            let position;
            if (target === 'trigger' && triggerBlock) {
              position = { x: triggerBlock.position.x, y: triggerBlock.position.y + 150 };
            } else if (target.startsWith('action-')) {
              const index = parseInt(target.split('-')[1]);
              const targetBlock = actionBlocks[index];
              position = { x: targetBlock.position.x, y: targetBlock.position.y + 150 };
            } else {
              return; // No valid snap target
            }

            const newBlock: WorkflowBlock = {
              id: `${parsedAction.type}_${Date.now()}`,
              type: parsedAction.type as 'action' | 'branch',
              [parsedAction.type === 'action' ? 'actionType' : 'branchType']: parsedAction.id,
              config: {},
              position,
              isConfigured: false,
            };
            
            onUpdateActionBlocks([...actionBlocks, newBlock]);
            setConfiguring(newBlock);
          }
        }
      } catch (error) {
        console.error('Failed to parse action data:', error);
      }
    }
    setDragging(null);
    setSnapTarget(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = dropZoneRef.current?.getBoundingClientRect();
    
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const target = findSnapTarget(x, y);
      
      setSnapTarget(target);
      setDragging(target ? 'snapping' : 'canvas');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setDragging(null);
      setSnapTarget(null);
    }
  };

  const handleConfigureBlock = (block: WorkflowBlock) => {
    setConfiguring(block);
  };

  const handleSaveBlockConfig = (config: Record<string, any>) => {
    if (!configuring) return;

    if (configuring.type === 'trigger' && onTriggerDoubleClick) {
      // Handle trigger update differently if needed
      return;
    }

    const updatedBlocks = actionBlocks.map(block =>
      block.id === configuring.id
        ? { ...block, config, isConfigured: true }
        : block
    );
    
    onUpdateActionBlocks(updatedBlocks);
    setConfiguring(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    const updatedBlocks = actionBlocks.filter(block => block.id !== blockId);
    onUpdateActionBlocks(updatedBlocks);
  };

  const getBlockTitle = (block: WorkflowBlock) => {
    if (block.type === 'trigger') {
      return block.eventType?.replace('_', ' ').toUpperCase() || 'TRIGGER';
    } else if (block.type === 'branch') {
      return block.branchType?.replace('_', ' ').toUpperCase() || 'BRANCH';
    }
    return block.actionType?.replace('_', ' ').toUpperCase() || 'ACTION';
  };

  const getBlockDescription = (block: WorkflowBlock) => {
    if (block.config.name) return block.config.name;
    if (block.config.subject) return block.config.subject;
    if (block.config.title) return block.config.title;
    return block.isConfigured ? 'Configured' : 'Needs configuration';
  };

  const renderWorkflowBlock = (block: WorkflowBlock, index: number) => {
    const isSnapTarget: boolean = snapTarget === (block.type === 'trigger' ? 'trigger' : `action-${index}`);
    const validationColor = block.isConfigured ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50';
    const glowClass = block.isConfigured ? 'shadow-green-200' : 'shadow-red-200';
    
    return (
      <div key={block.id} className="relative group">
        <Card className={`w-80 mx-auto transition-all ${validationColor} ${glowClass} ${
          isSnapTarget ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
        } shadow-lg`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant={block.type === 'trigger' ? 'default' : block.type === 'branch' ? 'outline' : 'secondary'}>
                {block.type === 'trigger' ? 'Trigger' : block.type === 'branch' ? 'Branch' : 'Action'}
              </Badge>
              <div className="flex items-center space-x-1">
                {block.type !== 'trigger' && (
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
                      onClick={() => handleConfigureBlock(block)}
                    >
                      <Settings className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={() => handleDeleteBlock(block.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <CardTitle 
              className="text-sm font-medium cursor-pointer" 
              onDoubleClick={block.type === 'trigger' ? onTriggerDoubleClick : undefined}
            >
              {getBlockTitle(block)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs mb-2">
              {block.isConfigured ? (
                <span className="text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Configured
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Needs configuration
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {getBlockDescription(block)}
            </div>
          </CardContent>
        </Card>

        {/* Connector line to next block */}
        {(block.type === 'trigger' && actionBlocks.length > 0) || 
         (block.type !== 'trigger' && index < actionBlocks.length - 1) ? (
          <div className="flex justify-center mt-4 mb-4">
            <div className="w-px h-8 bg-border"></div>
            <ArrowDown className="w-5 h-5 text-muted-foreground -mt-2" />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="h-full p-6 bg-gray-50/50 overflow-y-auto">
      <div 
        ref={dropZoneRef}
        className={`min-h-full border-2 border-dashed rounded-lg p-8 bg-white transition-colors ${
          dragging === 'snapping' ? 'border-blue-400 bg-blue-50' : 
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
            
            {/* Drop zone indicator */}
            {dragging && (
              <div className={`w-80 mx-auto p-8 border-2 border-dashed rounded-lg text-center transition-colors mt-4 ${
                snapTarget ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-gray-400 bg-gray-50 text-muted-foreground'
              }`}>
                <div className="text-sm">
                  {snapTarget ? 'Drop here to connect' : 'Drag near a block to connect'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {configuring && (
        <BlockConfigDialog
          block={configuring}
          open={!!configuring}
          onOpenChange={() => setConfiguring(null)}
          onSave={handleSaveBlockConfig}
        />
      )}
    </div>
  );
};
