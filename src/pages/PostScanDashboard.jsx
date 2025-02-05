import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  PhoneCall,
  MapPin,
  Activity,
  Users,
  FileText,
  Heart,
  Droplets,
  Brain,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer,
  Bone,
  AlertCircle,
  TreesIcon as Lungs,
  Shield,
} from "lucide-react";
import GridPattern from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import { useRecoilValue } from "recoil";
import { postScanPinAtom, saviourDetailsAtom } from "../store/UserAtoms";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import Modal from "../components/ui/modal";

export default function PostScanDashboard() {
  const { toast } = useToast();
  const baseUrl = "http://3.108.8.215/api/v1";
  const pin = useRecoilValue(postScanPinAtom);
  const saviourDetails = useRecoilValue(saviourDetailsAtom);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [nearestHospitalData, setNearestHospitalData] = useState([]);
  const [planDescription, setPlanDescription] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [manualLocation, setManualLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [actionType, setActionType] = useState(null);

  const [userData, setUserData] = useState({
    pin: pin,
    emergency_contact: [],
    medical_detail: [
      {
        blood_group: "",
        blood_donor: "",
        blood_pressure: "",
        diabetes: "",
        cholesterol: "",
        heart_related: "",
        asthma: "",
        tuberculosis: "",
        mental_illness: "",
        epilepsy: "",
        nsaids: "",
        steroids: "",
        anticogulant: "",
        surgery_history: "",
        organ_implant: "",
        disabled: "",
        reason_disabled: "",
        additonal_info: "",
        medications: "",
        allergies: "",
      },
    ],
    first_name: "",
    last_name: "",
    image: "",
  });

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
    organ_implant: Stethoscope,
  };

  const actionButtons = [
    {
      icon: Users,
      label: "Emergency Contacts",
      color: "bg-sky-500 hover:bg-sky-600",
      onClick: () => setShowEmergencyContacts(!showEmergencyContacts),
    },
    {
      icon: FileText,
      label: "Medical History",
      color: "bg-sky-500 hover:bg-sky-600",
      onClick: () => setShowMedicalHistory(!showMedicalHistory),
    },
    {
      icon: PhoneCall,
      label: "Call Ambulance",
      color: "bg-sky-500 hover:bg-sky-600",
      onClick: () => {
        handleCallAmbulance();
      },
    },
    {
      icon: MapPin,
      label: "Nearby Hospital",
      color: "bg-sky-500 dark:bg-sky-500",
      onClick: () => {
        handleNearbyHospital();
      },
    },
    ...(saviourDetails.isDoctor === "True"
      ? [
          {
            icon: Shield,
            label: "Insurance",
            color: "bg-sky-500 hover:bg-sky-600",
          },
        ]
      : []),
  ].filter(
    (button) =>
      planDescription === "Rakshak plan" || button.label !== "Medical History"
  );

  const medicalConditions = userData.medical_detail[0];

  const renderMedicalCondition = (label, value, IconComponent) => (
    <div className="flex items-center justify-between p-3 bg-sky-500/20 dark:bg-sky-500/20 rounded-lg transition-all duration-200 hover:bg-sky-500/30 dark:hover:bg-sky-500/30">
      <div className="flex items-center">
        <IconComponent className="w-5 h-5 mr-2 text-sky-500 dark:text-sky-200" />
        <span className="text-sky-800 dark:text-white">{label}</span>
      </div>
      <Badge
        className={
          value?.toLowerCase() === "yes" || value?.toLowerCase() === "true"
            ? "bg-green-500 hover:bg-green-600"
            : value?.toLowerCase() === "no" || value?.toLowerCase() === "false"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-sky-500 hover:bg-sky-600"
        }
      >
        {value}
      </Badge>
    </div>
  );

  useEffect(() => {
    fetchUserData();
  }, [pin]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/post_scan/pin/${pin}`);
      setPlanDescription(
        response.data.plan?.item?.description || "Sandesh plan"
      );
      const userData = response.data.profile;
      userData.pin = response.data.pin_number;
      setUserData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCallAmbulance = () => {
    setActionType("callAmbulance");
    if (!navigator.geolocation) {
      showLocationAccessDenied();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callAmbulance(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          showLocationAccessDenied();
        }
      );
    }
  };

  const handleNearbyHospital = () => {
    setActionType("nearestHospital");
    if (!navigator.geolocation) {
      showLocationAccessDenied();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          nearestHospital(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          showLocationAccessDenied();
        }
      );
    }
  };

  const showLocationAccessDenied = () => {
    setShowLocationModal(true);
  };

  const callAmbulance = async (latitude, longitude) => {
    try {
      const response = await axios.post(`${baseUrl}/post_scan/ambulance_call`, {
        pin_number: pin,
        saviour_name: saviourDetails.fullName,
        saviour_phone_number: saviourDetails.phoneNumber,
        latitude: latitude || manualLocation.latitude,
        longitude: longitude || manualLocation.longitude,
      });
      toast({
        title: "Success",
        description: "Ambulance called successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const nearestHospital = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `${baseUrl}/post_scan/nearest_hospital?lat=${
          latitude || manualLocation.latitude
        }&long=${longitude || manualLocation.longitude}`
      );
      setNearestHospitalData(response.data);
      toast({
        title: "Success",
        description: "Nearest hospital fetched successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 md:p-8">
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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 overflow-hidden"
        )}
      />
      <div className="max-w-7xl mx-auto mb-20">
        {/* Padding div for floating navbar */}
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid gap-6">
          <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20 relative">
            <div className="flex flex-col md:flex-row justify-between items-start p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-sky-200/20">
                    <AvatarImage
                      src={userData.image}
                      alt={`${userData.first_name} ${userData.last_name}`}
                    />
                    <AvatarFallback className="text-2xl md:text-3xl bg-sky-500">
                      {userData.first_name[0]}
                      {userData.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 w-full md:w-auto">
                  <div className="mb-4 md:mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-sky-800 dark:text-white mb-2">
                      {`${userData.first_name} ${userData.last_name}`}
                    </h1>
                    <Badge className="bg-sky-500/50 dark:bg-sky-500/50">
                      Pin: {userData.pin}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                className={`${button.color} hover:opacity-90 text-white h-auto py-2 md:py-4 flex justify-between items-center text-xs md:text-sm`}
                onClick={button.onClick}
              >
                <div className="flex items-center">
                  <button.icon className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {button.label}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Medical History */}
        {showMedicalHistory && (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(medicalConditions).map(([key, value]) => {
              if (
                [
                  "id",
                  "profile_id",
                  "disabled",
                  "reason_disabled",
                  "additonal_info",
                  "medications",
                  "allergies",
                ].includes(key)
              ) {
                return null;
              }

              const label = key
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              const IconComponent = medicalIcons[key] || AlertCircle;

              return (
                <Card
                  key={key}
                  className="bg-white/10 dark:bg-white/10 backdrop-blur-md light:border-black/20 dark:border-sky-200/20 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <CardContent className="p-4 md:p-6">
                    {renderMedicalCondition(label, value, IconComponent)}
                  </CardContent>
                </Card>
              );
            })}

            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md light:border-black/20 dark:border-sky-200/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-medium text-sky-800 dark:text-white">
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-sky-500/20 dark:bg-sky-500/20">
                    <h3 className="text-sm md:text-base text-sky-800 dark:text-white font-medium mb-2">
                      Disability Status
                    </h3>
                    <Badge
                      className={
                        medicalConditions.disabled === "Yes"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }
                    >
                      {medicalConditions.disabled}
                    </Badge>
                    {medicalConditions.reason_disabled && (
                      <p className="mt-2 text-xs md:text-sm text-sky-800 dark:text-sky-100">
                        {medicalConditions.reason_disabled}
                      </p>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-sky-500/20 dark:bg-sky-500/20">
                    <h3 className="text-sm md:text-base text-sky-800 dark:text-white font-medium mb-2">
                      Medical Notes
                    </h3>
                    <p className="text-xs md:text-sm text-sky-800 dark:text-sky-100">
                      {medicalConditions.additonal_info}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Emergency Contacts */}
        {showEmergencyContacts && (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {/* Family Contacts */}
            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md light:border-black/20 dark:border-sky-200/20">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-medium text-sky-800 dark:text-white flex items-center gap-2">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-sky-300" />
                  Family Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.emergency_contact[0]?.family_name1 && (
                  <div className="p-3 md:p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm md:text-base font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].family_name1}
                        </p>
                        {userData.emergency_contact[0].family_rel1 && (
                          <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                            {userData.emergency_contact[0].family_rel1}
                          </p>
                        )}
                        <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                          {userData.emergency_contact[0].family_phone1}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() =>
                          (window.location.href = `tel:${userData.emergency_contact[0].family_phone1}`)
                        }
                      >
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {userData.emergency_contact[0]?.family_name2 && (
                  <div className="p-3 md:p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm md:text-base font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].family_name2}
                        </p>
                        {userData.emergency_contact[0].family_rel2 && (
                          <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                            {userData.emergency_contact[0].family_rel2}
                          </p>
                        )}
                        <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                          {userData.emergency_contact[0].family_phone2}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() =>
                          (window.location.href = `tel:${userData.emergency_contact[0].family_phone2}`)
                        }
                      >
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Friend Contacts */}
            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md light:border-black/20 dark:border-sky-200/20">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-medium text-sky-800 dark:text-white flex items-center gap-2">
                  <Heart className="h-4 w-4 md:h-5 md:w-5 text-sky-300" />
                  Friend Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.emergency_contact[0]?.friend_name1 && (
                  <div className="p-3 md:p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm md:text-base font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].friend_name1}
                        </p>
                        <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                          {userData.emergency_contact[0].friend_phone1}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() =>
                          (window.location.href = `tel:${userData.emergency_contact[0].friend_phone1}`)
                        }
                      >
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {userData.emergency_contact[0]?.friend_name2 && (
                  <div className="p-3 md:p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm md:text-base font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].friend_name2}
                        </p>
                        <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                          {userData.emergency_contact[0].friend_phone2}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                        onClick={() =>
                          (window.location.href = `tel:${userData.emergency_contact[0].friend_phone2}`)
                        }
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

        {/* Nearest Hospitals */}
        {nearestHospitalData.length > 0 && (
          <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20">
            <CardHeader>
              <CardTitle className="text-base md:text-lg font-medium text-sky-800 dark:text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-sky-300" />
                Nearest Hospitals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearestHospitalData.slice(1, 6).map((hospital, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm md:text-base font-medium text-sky-800 dark:text-white">
                        {hospital.name}
                      </p>
                      <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                        {hospital.address}
                      </p>
                      <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                        Distance: {hospital.distance}
                      </p>
                      <p className="text-xs md:text-sm light:text-black dark:text-sky-200">
                        Approx. Time: {hospital.approx_time}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sky-300 hover:text-sky-100 hover:bg-sky-500/20"
                      onClick={() =>
                        window.open(hospital.map_direction, "_blank")
                      }
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
