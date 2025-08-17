import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface OrganizationData {
  name: string;
  type: 'Agency' | 'In-House';
  legalName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  timezone: string;
  locale: string;
  careersPageUrl: string;
  tagline: string;
  logo: string | null;
  enableClientPortal: boolean;
  companySize: string;
}

const timezones = [
  "(GMT-12:00) International Date Line West",
  "(GMT-11:00) Coordinated Universal Time-11",
  "(GMT-10:00) Hawaii",
  "(GMT-09:00) Alaska",
  "(GMT-08:00) Pacific Time (US & Canada)",
  "(GMT-07:00) Mountain Time (US & Canada)",
  "(GMT-06:00) Central Time (US & Canada)",
  "(GMT-05:00) Eastern Time (US & Canada)",
  "(GMT-04:00) Atlantic Time (Canada)",
  "(GMT-03:00) Brasilia",
  "(GMT-02:00) Coordinated Universal Time-02",
  "(GMT-01:00) Azores",
  "(GMT+00:00) Greenwich Mean Time",
  "(GMT+01:00) Central European Time",
  "(GMT+02:00) Eastern European Time",
  "(GMT+03:00) Moscow",
  "(GMT+04:00) Abu Dhabi",
  "(GMT+05:00) Pakistan",
  "(GMT+05:30) India",
  "(GMT+06:00) Bangladesh",
  "(GMT+07:00) Bangkok",
  "(GMT+08:00) Singapore",
  "(GMT+09:00) Tokyo",
  "(GMT+10:00) Sydney",
  "(GMT+11:00) Solomon Islands",
  "(GMT+12:00) Auckland"
];

const locales = [
  "English (US)",
  "English (UK)",
  "English (Canada)",
  "Spanish (Spain)",
  "Spanish (Mexico)",
  "French (France)",
  "German (Germany)",
  "Italian (Italy)",
  "Portuguese (Brazil)",
  "Dutch (Netherlands)",
  "Japanese (Japan)",
  "Korean (Korea)",
  "Chinese (Simplified)",
  "Chinese (Traditional)"
];

const companySizes = [
  "1–50",
  "51–200", 
  "201–1000",
  "1000+"
];

const OrganizationSettings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  
  const [originalData, setOriginalData] = useState<OrganizationData>({
    name: "SpotAxis",
    type: "Agency",
    legalName: "SpotAxis LLC",
    primaryContactName: "John Smith",
    primaryContactEmail: "admin@spotaxis.com",
    primaryContactPhone: "+1-555-0123",
    timezone: "(GMT-05:00) Eastern Time (US & Canada)",
    locale: "English (US)",
    careersPageUrl: "https://spotaxis.com/careers",
    tagline: "Finding the right talent for your team",
    logo: null,
    enableClientPortal: true,
    companySize: "51–200"
  });

  const [formData, setFormData] = useState<OrganizationData>(originalData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const hasUnsavedChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value || value.length < 2) return "Please enter your organization name.";
        break;
      case 'primaryContactName':
        if (!value) return "Please provide a primary contact name.";
        break;
      case 'primaryContactEmail':
        if (!value) return "Enter a valid email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
        break;
      case 'timezone':
        if (!value) return "Please select a timezone.";
        break;
    }
    return '';
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (typeof value === 'string') {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, logo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, logo: null }));
  };

  const isFormValid = () => {
    const requiredFields = ['name', 'primaryContactName', 'primaryContactEmail', 'timezone'];
    return requiredFields.every(field => {
      const value = formData[field as keyof OrganizationData] as string;
      return value && !validateField(field, value);
    });
  };

  const handleSave = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOriginalData(formData);
    setLastUpdated(new Date());
    setIsLoading(false);
    
    toast({
      title: "Organization updated",
      description: "Your organization details have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(originalData);
    setErrors({});
  };

  const handleNavigation = (path: string) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(path);
      setShowUnsavedDialog(true);
    } else {
      navigate(path);
    }
  };

  const confirmDiscard = () => {
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
    setShowUnsavedDialog(false);
    setPendingNavigation(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <PageContainer title="Organization details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{formData.name}</h1>
            <p className="text-muted-foreground mt-1">
              Core identity and contact settings for your organization.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{formData.type}</Badge>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              Active
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">General information</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Organization name *</Label>
                  <Input
                    id="name"
                    placeholder="Acme Recruiting"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  <p className="text-sm text-muted-foreground">
                    This name appears in emails and your account.
                  </p>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Organization Type */}
                <div className="space-y-3">
                  <Label>Organization type *</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value: 'Agency' | 'In-House') => handleInputChange('type', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Agency" id="agency" />
                      <Label htmlFor="agency">Agency</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="In-House" id="in-house" />
                      <Label htmlFor="in-house">In-House</Label>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground">
                    Choose whether you operate as a recruitment agency or as an in-house hiring team. This selection adjusts relevant defaults across the product.
                  </p>
                  
                  {/* Conditional Fields */}
                  {formData.type === 'Agency' && (
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="clientPortal"
                        checked={formData.enableClientPortal}
                        onCheckedChange={(checked) => handleInputChange('enableClientPortal', checked as boolean)}
                      />
                      <Label htmlFor="clientPortal" className="text-sm">
                        Enable client portal (agency)
                      </Label>
                      <p className="text-xs text-muted-foreground ml-2">
                        Allow clients to view selected jobs and candidate updates.
                      </p>
                    </div>
                  )}
                  
                  {formData.type === 'In-House' && (
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="companySize">Company size</Label>
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => handleInputChange('companySize', value)}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Used to tailor defaults.
                      </p>
                    </div>
                  )}
                </div>

                {/* Legal Name */}
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal / billing name</Label>
                  <Input
                    id="legalName"
                    placeholder="Acme Recruiting LLC"
                    value={formData.legalName}
                    onChange={(e) => handleInputChange('legalName', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    This name will appear on invoices.
                  </p>
                </div>

                {/* Primary Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="primaryContactName">Primary contact name *</Label>
                  <Input
                    id="primaryContactName"
                    placeholder="Jane Doe"
                    value={formData.primaryContactName}
                    onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                    className={errors.primaryContactName ? 'border-destructive' : ''}
                  />
                  {errors.primaryContactName && (
                    <p className="text-sm text-destructive">{errors.primaryContactName}</p>
                  )}
                </div>

                {/* Primary Contact Email */}
                <div className="space-y-2">
                  <Label htmlFor="primaryContactEmail">Primary contact email *</Label>
                  <Input
                    id="primaryContactEmail"
                    type="email"
                    placeholder="admin@acme.com"
                    value={formData.primaryContactEmail}
                    onChange={(e) => handleInputChange('primaryContactEmail', e.target.value)}
                    className={errors.primaryContactEmail ? 'border-destructive' : ''}
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for admin notifications and billing communications.
                  </p>
                  {errors.primaryContactEmail && (
                    <p className="text-sm text-destructive">{errors.primaryContactEmail}</p>
                  )}
                </div>

                {/* Primary Contact Phone */}
                <div className="space-y-2">
                  <Label htmlFor="primaryContactPhone">Primary contact phone</Label>
                  <Input
                    id="primaryContactPhone"
                    placeholder="+1-555-123-4567"
                    value={formData.primaryContactPhone}
                    onChange={(e) => handleInputChange('primaryContactPhone', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Optional — used for urgent alerts.
                  </p>
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default timezone *</Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => handleInputChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Sets default time for scheduled interviews and activity timestamps.
                  </p>
                  {errors.timezone && (
                    <p className="text-sm text-destructive">{errors.timezone}</p>
                  )}
                </div>

                {/* Locale */}
                <div className="space-y-2">
                  <Label htmlFor="locale">Locale / Date format</Label>
                  <Select
                    value={formData.locale}
                    onValueChange={(value) => handleInputChange('locale', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select locale" />
                    </SelectTrigger>
                    <SelectContent>
                      {locales.map((locale) => (
                        <SelectItem key={locale} value={locale}>
                          {locale}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Careers Page URL */}
                <div className="space-y-2">
                  <Label htmlFor="careersPageUrl">Public careers page URL</Label>
                  <Input
                    id="careersPageUrl"
                    placeholder="https://acme.com/careers"
                    value={formData.careersPageUrl}
                    onChange={(e) => handleInputChange('careersPageUrl', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Optional link displayed on published job pages.
                  </p>
                </div>

                {/* Tagline */}
                <div className="space-y-2">
                  <Label htmlFor="tagline">Short description / Tagline</Label>
                  <Input
                    id="tagline"
                    placeholder="Your company tagline"
                    maxLength={140}
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Shown in job share messages. ({formData.tagline.length}/140)
                  </p>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo upload</Label>
                  <div className="space-y-3">
                    {formData.logo ? (
                      <div className="relative inline-block">
                        <img
                          src={formData.logo}
                          alt="Organization logo"
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 w-6 h-6"
                          onClick={removeLogo}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                        <label htmlFor="logoInput" className="cursor-pointer">
                          <span className="text-sm font-medium text-primary hover:text-primary/80">
                            Upload a logo
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">
                            or drag and drop
                          </span>
                        </label>
                        <input
                          id="logoInput"
                          type="file"
                          className="hidden"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleLogoUpload}
                        />
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Recommended: 400x400 PNG/JPG.
                    </p>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={!hasUnsavedChanges}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!isFormValid() || !hasUnsavedChanges || isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">{formData.name}</h3>
                <Badge variant="secondary" className="w-fit">
                  {formData.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {lastUpdated.toLocaleString()}
                  </p>
                </div>
                
                {formData.type === 'Agency' && (
                  <div>
                    <p className="text-sm">
                      Client portal: {formData.enableClientPortal ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                )}
                
                {formData.type === 'In-House' && formData.companySize && (
                  <div>
                    <p className="text-sm">
                      Company size: {formData.companySize}
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Invite team
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    View billing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Dialog */}
      <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Discard changes or keep editing?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowUnsavedDialog(false)}>
              Continue Editing
            </Button>
            <Button variant="destructive" onClick={confirmDiscard}>
              Discard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default OrganizationSettings;