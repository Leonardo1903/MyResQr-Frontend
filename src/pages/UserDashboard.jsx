import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { PhoneCall, Mail, MapPin, Calendar, Activity, UserPlus, Clock, Shield, Users, FileText, Smartphone, Home, Flag, MapPinned, Heart, Droplets, Brain, Pill, Syringe, Stethoscope, Thermometer, Bone, AlertCircle, TreesIcon as Lungs } from 'lucide-react';
import GridPattern from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import { useRecoilValue } from "recoil";
import { userDashboardDataAtom } from "../store/UserAtoms";

export default function UserDashboard() {
  const userData = useRecoilValue(userDashboardDataAtom);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);

  const medicalIcons = {
    blood_group: Droplets,
    blood_donor: Heart,
    blood_pressure: Activity,
    diabetes: Syringe,
    cholesterol: Thermometer,
    heart_related: Heart,
    asthma: Lungs,
    tuberculosis: Lungs,
    mental_illness: Brain,
    epilepsy: Brain,
    nsaids: Pill,
    steroids: Pill,
    anticogulant: Droplets,
    surgery_history: Bone,
    organ_implant: Stethoscope
  };

  const personalDetails = [
    { icon: Mail, label: "Email", value: userData.email_id },
    { icon: PhoneCall, label: "Mobile", value: userData.mobile_number },
    { icon: Smartphone, label: "WhatsApp", value: userData.whatsapp_number },
    { icon: Calendar, label: "Date of Birth", value: userData.dob },
    { icon: Home, label: "Address", value: userData.address },
    { icon: MapPinned, label: "City", value: userData.city },
    { icon: MapPin, label: "State", value: userData.state },
    { icon: Flag, label: "Country", value: userData.country }
  ];

  const actionButtons = [
    { icon: UserPlus, label: "Add Member", color: "bg-sky-600 dark:bg-sky-600" },
    { icon: Clock, label: "Scan Logs", color: "bg-emerald-600 dark:bg-emerald-600" },
    { icon: Shield, label: "Insurance", color: "bg-violet-600 dark:bg-violet-600" },
    { icon: Users, label: "Emergency Contacts", color: "bg-amber-600 dark:bg-amber-600", onClick: () => setShowEmergencyContacts(!showEmergencyContacts) },
    { icon: FileText, label: "Medical History", color: "bg-indigo-600 dark:bg-indigo-600", onClick: () => setShowMedicalHistory(!showMedicalHistory) }
  ];

  const medicalConditions = userData.medical_detail[0] || {};

  const renderMedicalCondition = (label, value, IconComponent) => (
    <div className="flex items-center justify-between p-3 bg-sky-500/20 dark:bg-sky-500/20 rounded-lg transition-all duration-200 hover:bg-sky-500/30 dark:hover:bg-sky-500/30">
      <div className="flex items-center">
        <IconComponent className="w-5 h-5 mr-2 text-sky-500 dark:text-sky-200" />
        <span className="text-sky-800 dark:text-white">{label}</span>
      </div>
      <Badge className={
        value.toLowerCase() === 'yes' || value.toLowerCase() === 'true' 
          ? 'bg-green-500 hover:bg-green-600' 
          : value.toLowerCase() === 'no' || value.toLowerCase() === 'false'
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-sky-500 hover:bg-sky-600'
      }>
        {value}
      </Badge>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  p-4 md:p-8">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [30, 20],
          [4, 10],
          [4, 20],
          [4, 15],
          [3, 12],
          [30, 10],
          [40, 10],
          [50, 40],
        ]}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="max-w-7xl mx-auto mb-20">
        {/* // Padding div for floating navbar */}
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid gap-6">
          <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col items-center lg:items-start gap-4">
                  <Avatar className="w-32 h-32 border-4 border-sky-200/20">
                    <AvatarImage src={userData.image} alt={`${userData.first_name} ${userData.last_name}`} />
                    <AvatarFallback className="text-3xl bg-sky-500">
                      {userData.first_name[0]}{userData.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="destructive" 
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 text-white w-full lg:w-auto"
                  >
                    <PhoneCall className="mr-2 h-5 w-5" />
                    Emergency Call
                  </Button>
                </div>

                <div className="flex-1">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-sky-800 dark:text-white mb-2">
                      {`${userData.first_name} ${userData.last_name}`}
                    </h1>
                    <Badge className="bg-sky-500/50 dark:bg-sky-500/50">ID: #{userData.id}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {personalDetails.map((detail, index) => (
                      <div key={index} className="flex items-center gap-2 text-sky-800 dark:text-sky-100">
                        <detail.icon className="w-4 h-4 text-sky-500 dark:text-sky-300" />
                        <span className="text-sm">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                className={`${button.color} hover:opacity-90 text-white h-auto py-4`}
                onClick={button.onClick}
              >
                <button.icon className="mr-2 h-5 w-5" />
                {button.label}
              </Button>
            ))}
          </div>
        </div>

        {showMedicalHistory && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(medicalConditions).map(([key, value]) => {
              if (['id', 'profile_id', 'disabled', 'reason_disabled', 'additonal_info', 'medications', 'allergies'].includes(key)) {
                return null;
              }
              
              const label = key.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');
              
              const IconComponent = medicalIcons[key] || AlertCircle;
              
              return (
                <Card key={key} className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20 transition-transform duration-200 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    {renderMedicalCondition(label, value, IconComponent)}
                  </CardContent>
                </Card>
              );
            })}

            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-sky-800 dark:text-white">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-sky-500/20 dark:bg-sky-500/20">
                    <h3 className="text-sky-800 dark:text-white font-medium mb-2">Disability Status</h3>
                    <Badge className={medicalConditions.disabled === 'Yes' ? 'bg-yellow-500' : 'bg-green-500'}>
                      {medicalConditions.disabled}
                    </Badge>
                    {medicalConditions.reason_disabled && (
                      <p className="mt-2 text-sky-800 dark:text-sky-100">{medicalConditions.reason_disabled}</p>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-sky-500/20 dark:bg-sky-500/20">
                    <h3 className="text-sky-800 dark:text-white font-medium mb-2">Medical Notes</h3>
                    <p className="text-sky-800 dark:text-sky-100">{medicalConditions.additonal_info}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {showEmergencyContacts && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Family Contacts */}
            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-sky-800 dark:text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-sky-300" />
                  Family Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.emergency_contact[0]?.family_name1 && (
                  <div className="p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sky-800 dark:text-white">{userData.emergency_contact[0].family_name1}</p>
                        {userData.emergency_contact[0].family_rel1 && (
                          <p className="text-sm text-sky-200">{userData.emergency_contact[0].family_rel1}</p>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() => window.location.href = `tel:${userData.emergency_contact[0].family_phone1}`}
                      >
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {userData.emergency_contact[0]?.family_name2 && (
                  <div className="p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sky-800 dark:text-white">{userData.emergency_contact[0].family_name2}</p>
                        {userData.emergency_contact[0].family_rel2 && (
                          <p className="text-sm text-sky-200">{userData.emergency_contact[0].family_rel2}</p>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() => window.location.href = `tel:${userData.emergency_contact[0].family_phone2}`}
                      >
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Friend Contacts */}
            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-sky-800 dark:text-white flex items-center gap-2">
                  <Heart className="h-5 w-5 text-sky-300" />
                  Friend Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.emergency_contact[0]?.friend_name1 && (
                  <div className="p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sky-800 dark:text-white">{userData.emergency_contact[0].friend_name1}</p>
                        <p className="text-sm text-sky-200">{userData.emergency_contact[0].friend_phone1}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() => window.location.href = `tel:${userData.emergency_contact[0].friend_phone1}`}
                      >
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {userData.emergency_contact[0]?.friend_name2 && (
                  <div className="p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sky-800 dark:text-white">{userData.emergency_contact[0].friend_name2}</p>
                        <p className="text-sm text-sky-200">{userData.emergency_contact[0].friend_phone2}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() => window.location.href = `tel:${userData.emergency_contact[0].friend_phone2}`}
                      >
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}