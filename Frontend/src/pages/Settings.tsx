import React, { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Loader2, User as UserIcon } from "lucide-react"
import { useProfile, useUpdateProfile } from "@/hooks/useProfile"
import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router-dom"
import { usePremiumAccess } from "@/hooks/usePremiumAccess"
import { MobileSwitch } from "@/components/ui/mobile-switch"

const Settings = () => {
  const { user, loading: authLoading } = useAuth()
  const { data: profile, isLoading: profileLoading } = useProfile()
  const updateProfile = useUpdateProfile()
  const { hasPremiumAccess } = usePremiumAccess()

  // Form state
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "")
      setDisplayName(profile.display_name || "")
      setAvatarUrl(profile.avatar_url || "")
    }
  }, [profile])

  const handleSaveProfile = async () => {
    if (!profile) return

    updateProfile.mutate({
      username: username.trim(),
      display_name: displayName.trim(),
      avatar_url: avatarUrl.trim() || null,
    })
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long")
      return
    }

    // TODO: Implement password change functionality
    console.log("Password change requested")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading settings...</span>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-4">
              You need to be logged in to access settings.
            </p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Tabs defaultValue="account" className="space-y-6">
                    <TabsList
              className="
                flex sm:grid sm:grid-cols-4
                bg-white rounded-md shadow-sm p-1
                space-x-2 sm:space-x-0
              "
            >
              <TabsTrigger value="account" className="px-3 py-2 whitespace-nowrap">
                Account
              </TabsTrigger>
              <TabsTrigger value="privacy" className="px-3 py-2 whitespace-nowrap">
                Privacy
              </TabsTrigger>
              <TabsTrigger value="notifications" className="px-3 py-2 whitespace-nowrap">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="px-3 py-2 whitespace-nowrap">
                Security
              </TabsTrigger>
            </TabsList>



          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter display name"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Email cannot be changed here
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleSaveProfile}
                  disabled={updateProfile.isPending}
                  className="bg-roblox-blue hover:bg-roblox-blue/90"
                >
                  {updateProfile.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Link to="/profile">
                  <Button variant="outline">View Profile</Button>
                </Link>
              </div>
            </div>

            {/* Avatar Customization */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Avatar Customization
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-full overflow-hidden">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserIcon className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-medium text-lg">Cartoon Avatar</h3>
                    <p className="text-sm text-gray-600 break-words">
                      {hasPremiumAccess
                        ? "Customize your avatar with premium templates"
                        : "Premium feature - Upgrade to customize your avatar"}
                    </p>
                    {profile?.avatar_style && (
                      <p className="text-xs text-gray-500 mt-1">
                        Current style: {profile.avatar_style}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Link to="/avatar-customization" className="w-full sm:w-auto">
                    <Button
                      variant={hasPremiumAccess ? "default" : "outline"}
                      className={`w-full sm:w-auto ${
                        hasPremiumAccess
                          ? "bg-roblox-blue hover:bg-roblox-blue/90"
                          : ""
                      }`}
                    >
                      {hasPremiumAccess ? "Customize Avatar" : "View Premium"}
                    </Button>
                  </Link>
                  {!hasPremiumAccess && (
                    <Link to="/subscription" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-roblox-blue hover:bg-roblox-blue/90">
                        Upgrade
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
              <div className="space-y-8">
                {/* Profile Visibility */}
                <div className="flex flex-col space-y-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-base">Profile Visibility</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Who can see your profile
                    </p>
                  </div>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-roblox-blue focus:border-transparent">
                    <option>Everyone</option>
                    <option>Friends Only</option>
                    <option>Private</option>
                  </select>
                </div>

                <Separator className="my-6" />

                {/* Online Status */}
                <div className="flex justify-between items-center">
                  <div className="w-full">
                    <div className="hidden sm:block">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-base">Show Online Status</h3>
                          <p className="text-sm text-gray-600">
                            Let others see when you're online
                          </p>
                        </div>
                        <Switch
                          checked={showOnlineStatus}
                          onCheckedChange={setShowOnlineStatus}
                          className="ml-4"
                        />
                      </div>
                    </div>
                    <div className="block sm:hidden">
                      <MobileSwitch
                        checked={showOnlineStatus}
                        onCheckedChange={setShowOnlineStatus}
                        label="Show Online Status"
                        description="Let others see when you're online"
                        className="flex items-center justify-between"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-8">
                {/* Email Notifications */}
                <div className="flex justify-between items-center">
                  <div className="w-full">
                    <div className="hidden sm:block">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-base">Email Notifications</h3>
                          <p className="text-sm text-gray-600">
                            Receive updates via email
                          </p>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                          className="ml-4"
                        />
                      </div>
                    </div>
                    <div className="block sm:hidden">
                      <MobileSwitch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        label="Email Notifications"
                        description="Receive updates via email"
                        className="flex items-center justify-between"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Push Notifications */}
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <div className="hidden sm:block">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-base">Push Notifications</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Receive push notifications
                          </p>
                        </div>
                        <Switch
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                    </div>
                    <div className="block sm:hidden">
                      <MobileSwitch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                        label="Push Notifications"
                        description="Receive push notifications"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-6">
              

                <Separator />

                {/* Password Change */}
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={handlePasswordChange}
                      disabled={
                        !currentPassword || !newPassword || !confirmPassword
                      }
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

export default Settings
