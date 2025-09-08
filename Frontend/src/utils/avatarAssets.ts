const SUPABASE_URL = 'https://xubgwftwnebwljhykqlc.supabase.co';
const DEFAULT_AVATAR_URL = `${SUPABASE_URL}/storage/v1/object/public/avatars/default-avatar.png`;

// Helper function to get the proper image URL from Supabase Storage
export const getAvatarImageUrl = (dbImageUrl: string | null): string => {
  if (!dbImageUrl) return DEFAULT_AVATAR_URL;
  
  // If it's already a full Supabase Storage URL, return it
  if (dbImageUrl.includes('supabase.co/storage')) {
    return dbImageUrl;
  }
  
  // If it's a legacy local path, convert to Storage URL
  if (dbImageUrl.startsWith('/avatars/')) {
    const filename = dbImageUrl.replace('/avatars/', '');
    return `${SUPABASE_URL}/storage/v1/object/public/avatars/${filename}`;
  }
  
  // Return as-is if it's already a valid URL, otherwise use default
  return dbImageUrl.startsWith('http') ? dbImageUrl : DEFAULT_AVATAR_URL;
};