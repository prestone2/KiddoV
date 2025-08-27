
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, User } from 'lucide-react';
import { useAvatarTemplates, AvatarTemplate } from '@/hooks/useAvatarTemplates';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useToast } from '@/hooks/use-toast';

interface AvatarSelectorProps {
  currentAvatarStyle: string;
  currentAvatarUrl: string | null;
  onAvatarChange: (template: AvatarTemplate) => void;
  disabled?: boolean;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  currentAvatarStyle,
  currentAvatarUrl,
  onAvatarChange,
  disabled = false
}) => {
  const { data: templates, isLoading } = useAvatarTemplates();
  const { hasPremiumAccess } = usePremiumAccess();
  const { toast } = useToast();

  const handleTemplateSelect = (template: AvatarTemplate) => {
    if (template.is_premium && !hasPremiumAccess) {
      toast({
        title: "Premium Required",
        description: "This avatar is only available for premium users. Upgrade your account to access premium avatars.",
        variant: "destructive"
      });
      return;
    }
    
    onAvatarChange(template);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-roblox-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose Your Avatar</h3>
      
      {/* Current Avatar Display */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <Avatar className="h-16 w-16">
          <AvatarImage src={currentAvatarUrl || undefined} alt="Current avatar" />
          <AvatarFallback>
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">Current Avatar</p>
          <p className="text-xs text-gray-500">Style: {currentAvatarStyle}</p>
        </div>
      </div>

      {/* Avatar Templates Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates?.map((template) => {
          const isSelected = template.style === currentAvatarStyle;
          const isPremiumRequired = template.is_premium && !hasPremiumAccess;
          
          return (
            <div
              key={template.id}
              className={`relative p-3 border rounded-lg cursor-pointer transition-all ${
                isSelected 
                  ? 'border-roblox-blue bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${isPremiumRequired ? 'opacity-60' : ''}`}
              onClick={() => !disabled && handleTemplateSelect(template)}
            >
              <div className="text-center space-y-2">
                <Avatar className="h-12 w-12 mx-auto">
                  <AvatarImage src={template.image_url} alt={template.name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium truncate">{template.name}</p>
                  {template.is_premium && (
                    <Badge variant="secondary" className="text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute -top-1 -right-1 bg-roblox-blue text-white rounded-full p-1">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!hasPremiumAccess && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Crown className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Upgrade to Premium
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Unlock premium avatars and customize your profile with exclusive designs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
