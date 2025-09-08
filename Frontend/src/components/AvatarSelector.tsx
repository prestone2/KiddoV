
import React, { useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, User, Upload } from 'lucide-react';
import { useAvatarTemplates, AvatarTemplate } from '@/hooks/useAvatarTemplates';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useToast } from '@/hooks/use-toast';
import { getAvatarImageUrl } from '@/utils/avatarAssets';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';

interface AvatarSelectorProps {
  currentAvatarStyle: string;
  currentAvatarUrl: string | null;
  onAvatarChange: (template: AvatarTemplate) => void;
  onCustomAvatarUpload?: (avatarUrl: string) => void;
  disabled?: boolean;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  currentAvatarStyle,
  currentAvatarUrl,
  onAvatarChange,
  onCustomAvatarUpload,
  disabled = false
}) => {
  const { data: templates, isLoading } = useAvatarTemplates();
  const { hasPremiumAccess } = usePremiumAccess();
  const { toast } = useToast();
  const { uploadAvatar, uploading } = useAvatarUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    const uploadedUrl = await uploadAvatar(file);
    if (uploadedUrl && onCustomAvatarUpload) {
      onCustomAvatarUpload(uploadedUrl);
    }

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          <AvatarImage 
            src={getAvatarImageUrl(currentAvatarUrl || '/avatars/cartoon-01.png')} 
            alt="Current avatar"
            onError={(e) => {
              console.log('Current avatar failed to load:', currentAvatarUrl);
              (e.currentTarget as HTMLImageElement).src = getAvatarImageUrl('/avatars/cartoon-01.png');
            }}
          />
          <AvatarFallback>
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">Current Avatar</p>
          <p className="text-xs text-gray-500">Style: {currentAvatarStyle}</p>
        </div>
      </div>

      {/* Upload Custom Avatar Section */}
      {onCustomAvatarUpload && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <div className="space-y-2">
            <Upload className="h-8 w-8 text-gray-400 mx-auto" />
            <div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || uploading}
                size="sm"
              >
                {uploading ? 'Uploading...' : 'Upload Custom Avatar'}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Max 2MB • JPG, PNG, GIF supported
            </p>
          </div>
        </div>
      )}

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
                  <AvatarImage 
                    src={getAvatarImageUrl(template.image_url)}
                    alt={template.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      console.log('Avatar image failed to load:', template.image_url);
                      (e.currentTarget as HTMLImageElement).src = getAvatarImageUrl('/avatars/cartoon-01.png');
                    }}
                  />
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
