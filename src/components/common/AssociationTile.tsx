import React, { useState } from "react";
import { ChevronDown, ChevronRight, Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface AssociatedRecord {
  id: string;
  name: string;
  subtitle?: string;
  route: string;
}

interface AssociationTileProps {
  title: string;
  records: AssociatedRecord[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => Promise<AssociatedRecord[]>;
  onLink?: (record: AssociatedRecord) => void;
  onUnlink?: (recordId: string) => void;
  className?: string;
  defaultOpen?: boolean;
}

export const AssociationTile = ({
  title,
  records,
  searchPlaceholder = `Search ${title.toLowerCase()}...`,
  onSearch,
  onLink,
  onUnlink,
  className,
  defaultOpen = true
}: AssociationTileProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AssociatedRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() && onSearch) {
      setIsSearching(true);
      try {
        const results = await onSearch(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleLinkRecord = (record: AssociatedRecord) => {
    if (onLink) {
      onLink(record);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleNavigate = (route: string) => {
    window.location.href = route;
  };

  return (
    <Card className={cn("rounded-2xl shadow-md", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">{title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {records.length}
                </Badge>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="p-4 pt-0 space-y-3">
            {/* Search Input */}
            {onSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 h-8 text-sm"
                />
              </div>
            )}

            {/* Search Results */}
            {searchQuery && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {isSearching ? (
                  <div className="text-xs text-muted-foreground p-2">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-lg text-xs"
                    >
                      <div>
                        <div className="font-medium">{result.name}</div>
                        {result.subtitle && (
                          <div className="text-muted-foreground">{result.subtitle}</div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => handleLinkRecord(result)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground p-2">No results found</div>
                )}
              </div>
            )}

            {/* Linked Records */}
            <div className="space-y-2">
              {records.map((record) => (
                <div key={record.id} className="flex items-center justify-between group">
                  <Badge
                    variant="outline"
                    className="flex-1 justify-start cursor-pointer hover:bg-muted transition-colors text-xs py-1"
                    onClick={() => handleNavigate(record.route)}
                  >
                    <span className="truncate">{record.name}</span>
                  </Badge>
                  {onUnlink && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                      onClick={() => onUnlink(record.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
              {records.length === 0 && (
                <div className="text-xs text-muted-foreground p-2 text-center">
                  No {title.toLowerCase()} linked
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};