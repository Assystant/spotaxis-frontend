
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JobBoardProps {
  name: string;
  logo: string;
  description: string;
  isPaid: boolean;
  price?: string;
}

const jobBoards: JobBoardProps[] = [
  {
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    description: "Reach over 810M professionals globally",
    isPaid: true,
    price: "$495"
  },
  {
    name: "Indeed",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Indeed_logo.png",
    description: "The world's #1 job site with 250M unique visitors every month",
    isPaid: true,
    price: "$299"
  },
  {
    name: "Glassdoor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Glassdoor_logo.svg",
    description: "70M job seekers with company reviews and salary data",
    isPaid: true,
    price: "$249"
  },
  {
    name: "ZipRecruiter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/ZipRecruiter_logo.png",
    description: "Distribute to 100+ job boards with one submission",
    isPaid: true,
    price: "$349"
  },
  {
    name: "Company Website",
    logo: "/placeholder.svg",
    description: "Post on your company's careers page automatically",
    isPaid: false
  },
  {
    name: "Referral Program",
    logo: "/placeholder.svg",
    description: "Share with your employees and encourage referrals",
    isPaid: false
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Promote Your Job Listing</DialogTitle>
          <DialogClose className="absolute top-4 right-4">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{jobTitle}</h2>
            <p className="text-muted-foreground">{companyName}</p>
          </div>
          
          <p className="text-base mb-4">
            Congratulations on creating your job! Now, let's get your listing in front of the right candidates.
            Choose where you'd like to promote your job:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobBoards.map((board) => (
              <JobBoardCard key={board.name} board={board} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const JobBoardCard = ({ board }: { board: JobBoardProps }) => {
  return (
    <Card className="overflow-hidden">
      <div className={`h-2 w-full ${board.isPaid ? 'bg-amber-500' : 'bg-green-500'}`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded overflow-hidden bg-muted flex items-center justify-center">
              <img 
                src={board.logo} 
                alt={board.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            <div>
              <h3 className="font-medium">{board.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${board.isPaid ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                {board.isPaid ? 'Paid' : 'Free'}
              </span>
            </div>
          </div>
          {board.isPaid && (
            <span className="font-semibold text-sm">{board.price}</span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{board.description}</p>
        
        <Button variant={board.isPaid ? "outline" : "default"} className="w-full">
          {board.isPaid ? 'Buy Credit' : 'Post Job'}
        </Button>
      </CardContent>
    </Card>
  );
};
