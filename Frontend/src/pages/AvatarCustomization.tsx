
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import AvatarSelector from '@/components/AvatarSelector';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { AvatarTemplate } from '@/hooks/useAvatarTemplates';
import { useToast } from '@/hooks/use-toast';

const AvatarCustomization = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { hasPremiumAccess } = usePremiumAccess();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();
  
  const [selectedTemplate, setSelectedTemplate] = useState<AvatarTemplate | null>(null);

  const handleAvatarChange = (template: AvatarTemplate) => {
    setSelectedTemplate(template);
  };

  const handleCustomAvatarUpload = (avatarUrl: string) => {
    // Update profile directly with custom avatar
    updateProfile.mutate({
      avatar_url: avatarUrl,
      avatar_style: 'custom'
    });
  };

  const handleSave = async () => {
    if (!selectedTemplate || !profile) return;

    updateProfile.mutate({
      avatar_style: selectedTemplate.style,
      avatar_url: selectedTemplate.image_url,
      avatar_customization: {
        template_id: selectedTemplate.id,
        template_name: selectedTemplate.name,
        updated_at: new Date().toISOString()
      }
    }, {
      onSuccess: () => {
        toast({
          title: "Avatar Updated",
          description: "Your avatar has been successfully updated!",
        });
        navigate('/profile');
      }
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-4">You need to be logged in to customize your avatar.</p>
            <Button onClick={() => navigate('/login')}>Log In</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hasPremiumAccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => navigate('/profile')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium Feature</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">
                  Avatar customization is available only for premium users.
                </p>
                <p className="text-sm text-gray-500">
                  Upgrade your account to access exclusive avatar templates and customization options.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/subscription')}>
                    Upgrade to Premium
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/profile')}>
                    Back to Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading profile...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/profile')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            
            <Button 
              onClick={handleSave}
              disabled={!selectedTemplate || updateProfile.isPending}
              className="bg-roblox-blue hover:bg-roblox-blue/90"
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Avatar
                </>
              )}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customize Your Avatar</CardTitle>
            </CardHeader>
            <CardContent>
            <AvatarSelector
              currentAvatarStyle={profile?.avatar_style || 'cartoon_1'}
              currentAvatarUrl={profile?.avatar_url}
              onAvatarChange={handleAvatarChange}
              onCustomAvatarUpload={handleCustomAvatarUpload}
              disabled={updateProfile.isPending}
            />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AvatarCustomization;
