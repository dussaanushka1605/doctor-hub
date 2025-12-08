import { useEffect, useState } from "react";
import { User, Lock, Bell, Camera, Save, Shield, Eye, EyeOff, Check } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@medicare.com",
    phone: "+1 (555) 123-4567",
    specialty: "Cardiologist",
    license: "MD-123456789",
    hospital: "MediCare General Hospital",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appNotifications: true,
    appointmentReminders: true,
    patientMessages: true,
    systemUpdates: false,
    marketingEmails: false,
    weeklyReports: true,
  });

  useEffect(() => {
    document.title = "Settings | Doctor Portal";
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    if (passwords.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User, description: "Manage your personal information" },
    { id: "password", label: "Security", icon: Shield, description: "Update your password" },
    { id: "notifications", label: "Notifications", icon: Bell, description: "Configure your alerts" },
  ];

  return (
    <DashboardLayout pageTitle="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="card-medical-static p-2">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200",
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                style={activeTab === tab.id ? { 
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-primary)'
                } : undefined}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  activeTab === tab.id ? "bg-primary-foreground/20" : "bg-secondary"
                )}>
                  <tab.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold block">{tab.label}</span>
                  <span className={cn(
                    "text-xs truncate block",
                    activeTab === tab.id ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>{tab.description}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="card-medical-static p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    Profile Settings
                  </h3>
                  <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-8">
                {/* Profile Image */}
                <div className="flex items-center gap-6 p-6 bg-secondary/30 rounded-2xl">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center" style={{ boxShadow: 'var(--shadow-md)' }}>
                      <span className="text-3xl font-bold text-primary-foreground">SW</span>
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group-hover:scale-110"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{profile.name}</h4>
                    <p className="text-muted-foreground">{profile.specialty}</p>
                    <button type="button" className="text-sm text-primary font-semibold mt-2 hover:underline">
                      Upload new photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-sm font-semibold">Specialty</Label>
                    <Input
                      id="specialty"
                      value={profile.specialty}
                      onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license" className="text-sm font-semibold">Medical License</Label>
                    <Input
                      id="license"
                      value={profile.license}
                      onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospital" className="text-sm font-semibold">Hospital/Clinic</Label>
                    <Input
                      id="hospital"
                      value={profile.hospital}
                      onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50">
                  <Button type="submit" className="btn-medical-primary px-8">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Password Settings */}
          {activeTab === "password" && (
            <div className="card-medical-static p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    Security Settings
                  </h3>
                  <p className="text-sm text-muted-foreground">Update your password and security preferences</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-6 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword" className="text-sm font-semibold">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="oldPassword"
                      type={showOldPassword ? "text" : "password"}
                      value={passwords.oldPassword}
                      onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                      className="h-12 rounded-xl pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-semibold">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      className="h-12 rounded-xl pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="h-12 rounded-xl"
                    required
                  />
                  {passwords.newPassword && passwords.confirmPassword && (
                    <div className="flex items-center gap-2 mt-2">
                      {passwords.newPassword === passwords.confirmPassword ? (
                        <>
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-xs text-success font-medium">Passwords match</span>
                        </>
                      ) : (
                        <span className="text-xs text-destructive font-medium">Passwords do not match</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50">
                  <Button type="submit" className="btn-medical-primary px-8">
                    <Lock className="w-4 h-4" />
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-fade-in">
              <div className="card-medical-static p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center">
                    <Bell className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">
                      Notification Channels
                    </h3>
                    <p className="text-sm text-muted-foreground">Choose how you want to receive notifications</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", title: "Email Notifications", desc: "Receive notifications via email" },
                    { key: "smsNotifications", title: "SMS Notifications", desc: "Receive notifications via text message" },
                    { key: "appNotifications", title: "In-App Notifications", desc: "Show notifications within the app" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications] as boolean}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-medical-static p-8">
                <h3 className="font-display font-bold text-lg text-foreground mb-6">
                  Notification Types
                </h3>

                <div className="space-y-4">
                  {[
                    { key: "appointmentReminders", title: "Appointment Reminders", desc: "Get reminded about upcoming appointments" },
                    { key: "patientMessages", title: "Patient Messages", desc: "Notify when patients send you messages" },
                    { key: "systemUpdates", title: "System Updates", desc: "Important system and feature updates" },
                    { key: "weeklyReports", title: "Weekly Reports", desc: "Receive weekly summary of your activities" },
                    { key: "marketingEmails", title: "Marketing Emails", desc: "News, tips, and promotional content" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications] as boolean}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-6 mt-6 border-t border-border/50">
                  <Button onClick={handleSaveNotifications} className="btn-medical-primary px-8">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}