import { useState } from "react";
import { UserProfile } from "@/types/scheme";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { indianStates } from "@/data/schemes";
import { Sparkles, Loader2 } from "lucide-react";

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const UserProfileForm = ({ onSubmit, isLoading }: UserProfileFormProps) => {
  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    gender: "",
    state: "",
    category: "",
    income: 0,
    occupation: "",
    education: "",
    isDisabled: false,
    isMinority: false,
    isBPL: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant border-border">
      <CardHeader className="text-center pb-2">
        <CardTitle className="font-display text-2xl">Tell Us About Yourself</CardTitle>
        <CardDescription className="text-base">
          Enter your details to find government schemes you may be eligible for
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                min={1}
                max={120}
                value={formData.age}
                onChange={(e) => updateField("age", parseInt(e.target.value) || 0)}
                className="bg-background"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">State / UT</Label>
              <Select value={formData.state} onValueChange={(v) => updateField("state", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(v) => updateField("category", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="sc">Scheduled Caste (SC)</SelectItem>
                  <SelectItem value="st">Scheduled Tribe (ST)</SelectItem>
                  <SelectItem value="obc">Other Backward Class (OBC)</SelectItem>
                  <SelectItem value="ews">Economically Weaker Section (EWS)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Annual Income */}
            <div className="space-y-2">
              <Label htmlFor="income">Annual Family Income (₹)</Label>
              <Input
                id="income"
                type="number"
                min={0}
                value={formData.income}
                onChange={(e) => updateField("income", parseInt(e.target.value) || 0)}
                placeholder="e.g., 300000"
                className="bg-background"
                required
              />
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Select value={formData.occupation} onValueChange={(v) => updateField("occupation", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employed">Employed (Private)</SelectItem>
                  <SelectItem value="government">Government Employee</SelectItem>
                  <SelectItem value="self-employed">Self-Employed / Business</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="homemaker">Homemaker</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="daily-wage">Daily Wage Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Education */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="education">Highest Education</Label>
              <Select value={formData.education} onValueChange={(v) => updateField("education", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-formal">No Formal Education</SelectItem>
                  <SelectItem value="primary">Primary (1-5)</SelectItem>
                  <SelectItem value="middle">Middle School (6-8)</SelectItem>
                  <SelectItem value="secondary">Secondary (9-10)</SelectItem>
                  <SelectItem value="higher-secondary">Higher Secondary (11-12)</SelectItem>
                  <SelectItem value="diploma">Diploma / ITI</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="post-graduate">Post Graduate</SelectItem>
                  <SelectItem value="professional">Professional Degree (Doctor, Engineer, etc.)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground">Additional Information</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="disabled"
                  checked={formData.isDisabled}
                  onCheckedChange={(checked) => updateField("isDisabled", !!checked)}
                />
                <Label htmlFor="disabled" className="text-sm font-normal cursor-pointer">
                  Person with Disability
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="minority"
                  checked={formData.isMinority}
                  onCheckedChange={(checked) => updateField("isMinority", !!checked)}
                />
                <Label htmlFor="minority" className="text-sm font-normal cursor-pointer">
                  Minority Community
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bpl"
                  checked={formData.isBPL}
                  onCheckedChange={(checked) => updateField("isBPL", !!checked)}
                />
                <Label htmlFor="bpl" className="text-sm font-normal cursor-pointer">
                  Below Poverty Line (BPL)
                </Label>
              </div>
            </div>
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Finding Your Schemes...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Find Matching Schemes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
