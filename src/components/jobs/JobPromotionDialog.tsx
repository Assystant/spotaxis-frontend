import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface JobBoard {
  id: string;
  name: string;
  logo: string;
  description: string;
  isPaid: boolean;
  price?: string;
  isPromoted: boolean;
}

const initialJobBoards: JobBoard[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    description: "Reach over 810M professionals globally",
    isPaid: true,
    price: "$495",
    isPromoted: false
  },
  {
    id: "indeed",
    name: "Indeed",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Indeed_logo.png",
    description: "The world's #1 job site with 250M unique visitors every month",
    isPaid: true,
    price: "$299",
    isPromoted: true
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Glassdoor_logo.svg",
    description: "70M job seekers with company reviews and salary data",
    isPaid: true,
    price: "$249",
    isPromoted: false
  },
  {
    id: "ziprecruiter",
    name: "ZipRecruiter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/ZipRecruiter_logo.png",
    description: "Distribute to 100+ job boards with one submission",
    isPaid: true,
    price: "$349",
    isPromoted: true
  },
  {
    id: "company",
    name: "Company Website",
    logo: "/placeholder.svg",
    description: "Post on your company's careers page automatically",
    isPaid: false,
    isPromoted: false
  },
  {
    id: "referral",
    name: "Referral Program",
    logo: "/placeholder.svg",
    description: "Share with your employees and encourage referrals",
    isPaid: false,
    isPromoted: false
  }
];

interface JobPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  companyName: string;
}

export const JobPromotionDialog = ({
  open,
  onOpenChange,
  jobTitle,
  companyName
}: JobPromotionDialogProps) => {
  const [jobBoards, setJobBoards] = useState<JobBoard[]>(initialJobBoards);
  const { toast } = useToast();

  const promotedBoards = jobBoards.filter(board => board.isPromoted);
  const availableBoards = jobBoards.filter(board => !board.isPromoted);

  const handlePromote = (boardId: string) => {
    setJobBoards(prev => prev.map(board => 
      board.id === boardId ? { ...board, isPromoted: true } : board
    ));
    
    const board = jobBoards.find(b => b.id === boardId);
    toast({
      title: "Job promoted",
      description: `Job promoted to ${board?.name}.`,
    });
  };

  const handleRemovePromotion = (boardId: string) => {
    setJobBoards(prev => prev.map(board => 
      board.id === boardId ? { ...board, isPromoted: false } : board
    ));
    
    const board = jobBoards.find(b => b.id === boardId);
    toast({
      title: "Promotion removed",
      description: `Promotion removed from ${board?.name}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-lg">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-left">Promote Your Job</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 h-6 w-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => onOpenChange(false)}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h2 className="text-base font-medium">{jobTitle}</h2>
            <p className="text-sm text-muted-foreground">{companyName}</p>
          </div>
          
          {/* Promoted On Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold mb-2">Promoted On</h3>
              <Separator className="mb-4" />
            </div>
            
            {promotedBoards.length === 0 ? (
              <p className="text-sm text-muted-foreground">Not promoted on any boards yet.</p>
            ) : (
              <div className="space-y-3">
                {promotedBoards.map((board) => (
                  <JobBoardPill
                    key={board.id}
                    board={board}
                    isPromoted={true}
                    onAction={() => handleRemovePromotion(board.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Available Boards Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold mb-2">Available Boards</h3>
              <Separator className="mb-4" />
            </div>
            
            {availableBoards.length === 0 ? (
              <p className="text-sm text-muted-foreground">All boards have this job.</p>
            ) : (
              <div className="space-y-3">
                {availableBoards.map((board) => (
                  <JobBoardPill
                    key={board.id}
                    board={board}
                    isPromoted={false}
                    onAction={() => handlePromote(board.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full rounded-2xl"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface JobBoardPillProps {
  board: JobBoard;
  isPromoted: boolean;
  onAction: () => void;
}

const JobBoardPill = ({ board, isPromoted, onAction }: JobBoardPillProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded overflow-hidden bg-muted flex items-center justify-center">
          <img 
            src={board.logo} 
            alt={`${board.name} logo`}
            className="h-full w-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm">{board.name}</h4>
            {board.isPaid && board.price && (
              <span className="text-xs text-muted-foreground">({board.price})</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{board.description}</p>
        </div>
      </div>
      
      <Button
        variant={isPromoted ? "outline" : "default"}
        size="sm"
        onClick={onAction}
        className={`rounded-2xl ${isPromoted ? 'text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground' : ''}`}
        aria-label={isPromoted ? `Remove promotion from ${board.name}` : `Promote to ${board.name}`}
      >
        {isPromoted ? "Remove" : "Promote"}
      </Button>
    </div>
  );
};