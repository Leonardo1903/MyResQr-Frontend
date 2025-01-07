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
  Mail,
  MapPin,
  Calendar,
  Activity,
  BookUser,
  Clock,
  Shield,
  Users,
  FileText,
  Smartphone,
  Home,
  Flag,
  MapPinned,
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
  CreditCard,
  CreditCardIcon,
  KeyIcon,
  IndianRupee,
  Tag,
  CheckCircle,
  User,
  Phone,
  Hospital,
  ExternalLink,
  Edit,
  UserCog,
  FileSignature,
} from "lucide-react";
import GridPattern from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  accessTokenAtom,
  idAtom,
  pinAtom,
  userDashboardDataAtom,
} from "../store/UserAtoms";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { toast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const userData = useRecoilValue(userDashboardDataAtom);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const id = useRecoilValue(idAtom);
  const [planDetails, setPlanDetails] = useState({});
  const accessToken = useRecoilValue(accessTokenAtom);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [pin, setPin] = useRecoilState(pinAtom);
  const [showScanLogs, setShowScanLogs] = useState(false);
  const [scanLogData, setScanLogData] = useState({});
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
      toast({
        title: "Error",
        description: "Geolocation not supported by your browser.",
        variant: "destructive",
      });
    }
  }, []);

  const handleGetPlanDetails = async () => {
    // console.log("ID:", id);
    // console.log("Access token:", accessToken);
    try {
      const response = await axios.get(
        `${baseUrl}/pin_manager/pin_details/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPlanDetails(response.data);
      setPin(response.data.pin_number);
      // console.log("Plan details:", response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      console.error("Failed to fetch plan details:", error);
    }
  };

  const handleScanLogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/post_scan/scan_log/${pin}`);
      setScanLogData(response.data);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message;
    }
  };
  handleGetPlanDetails();

  const data = {
    pin_number: `${pin}`,
    latitude: location.latitude,
    longitude: location.longitude,
    saviour_name: `${userData.first_name} ${userData.last_name}`,
    saviour_phone_number: `${userData.mobile_number}`,
  };

  const handleEmergencyAmbulanceCall = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/post_scan/ambulance_call`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //console.log("Response : ", res.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
    }
  };

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

  const personalDetails = [
    { icon: Mail, label: "Email", value: userData.email_id },
    { icon: PhoneCall, label: "Mobile", value: userData.mobile_number },
    { icon: Smartphone, label: "WhatsApp", value: userData.whatsapp_number },
    { icon: Calendar, label: "Date of Birth", value: userData.dob },
    { icon: Home, label: "Address", value: userData.address },
    { icon: MapPinned, label: "City", value: userData.city },
    { icon: MapPin, label: "State", value: userData.state },
    { icon: Flag, label: "Country", value: userData.country },
  ];

  const actionButtons = [
    {
      icon: BookUser,
      label: "Plan Details",
      color: "bg-sky-500 hover:bg-sky-600",
      onClick: async () => {
        setShowPlanDetails(!showPlanDetails);
        if (!showPlanDetails) {
          await handleGetPlanDetails();
        }
      },
    },
    {
      icon: Clock,
      label: "Scan Logs",
      color: "bg-sky-500 hover:bg-sky-600",
      onClick: async () => {
        setShowScanLogs(!showScanLogs);
        if (!showScanLogs) {
          await handleScanLogs();
        }
      },
    },
    {
      icon: Shield,
      label: "Insurance",
      color: "bg-sky-500 hover:bg-sky-600",
    },
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
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount / 100);
  };

  const medicalConditions = userData.medical_detail?.[0] || {};

  const renderMedicalCondition = (label, value, IconComponent) => (
    <div className="flex items-center justify-between p-3 bg-sky-500/20 dark:bg-sky-500/20 rounded-lg transition-all duration-200 hover:bg-sky-500/30 dark:hover:bg-sky-500/30 ">
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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 overflow-hidden"
        )}
      />
      <div className="max-w-7xl mx-auto mb-20">
        {/* // Padding div for floating navbar */}
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid gap-6">
          <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20 relative">
            <div className="flex justify-between items-start p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col items-center lg:items-start gap-4">
                  <Avatar className="w-32 h-32 border-4 border-sky-200/20">
                    <AvatarImage
                      src={userData.image}
                      alt={`${userData.first_name} ${userData.last_name}`}
                    />
                    <AvatarFallback className="text-3xl bg-sky-500">
                      {userData.first_name[0]}
                      {userData.last_name[0]}
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
                    <Badge className="bg-sky-500/50 dark:bg-sky-500/50">
                      ID: #{userData.id}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {personalDetails.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sky-800 dark:text-sky-100"
                      >
                        <detail.icon className="w-4 h-4 text-sky-500 dark:text-sky-300" />
                        <span className="text-sm">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Dialog
                open={isUpdateProfileOpen}
                onOpenChange={setIsUpdateProfileOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                    <Edit className="mr-2 h-5 w-5" />
                    Update Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white/10 backdrop-blur-md border-sky-200/20 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-sky-800 dark:text-white">
                      Update Profile
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Button
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                      onClick={() => navigate("/update-profile")}
                    >
                      <UserCog className="mr-2 h-5 w-5" />
                      Update Personal Details
                    </Button>
                    <Button
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                      onClick={() => navigate("/update-emergency-info")}
                    >
                      <FileSignature className="mr-2 h-5 w-5" />
                      Update Emergency Details
                    </Button>
                    <Button
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                      onClick={() => navigate("/update-medical-info")}
                    >
                      <Stethoscope className="mr-2 h-5 w-5" />
                      Update Medical Details
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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

        {/* Medical History */}
        {showMedicalHistory && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <CardContent className="p-6">
                    {renderMedicalCondition(label, value, IconComponent)}
                  </CardContent>
                </Card>
              );
            })}

            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md light:border-black/20 dark:border-sky-200/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-sky-800 dark:text-white">
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-sky-500/20 dark:bg-sky-500/20">
                    <h3 className="text-sky-800 dark:text-white font-medium mb-2">
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
                      <p className="mt-2 text-sky-800 dark:text-sky-100">
                        {medicalConditions.reason_disabled}
                      </p>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-sky-500/20 dark:bg-sky-500/20">
                    <h3 className="text-sky-800 dark:text-white font-medium mb-2">
                      Medical Notes
                    </h3>
                    <p className="text-sky-800 dark:text-sky-100">
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
          <div className="grid gap-6 md:grid-cols-2">
            {/* Family Contacts */}
            <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md light:border-black/20 dark:border-sky-200/20">
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
                        <p className="font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].family_name1}
                        </p>
                        {userData.emergency_contact[0].family_rel1 && (
                          <p className="text-sm light:text-black dark:text-sky-200">
                            {userData.emergency_contact[0].family_rel1}
                          </p>
                        )}
                        <p className="text-sm light:text-black dark:text-sky-200">
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
                  <div className="p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].family_name2}
                        </p>
                        {userData.emergency_contact[0].family_rel2 && (
                          <p className="text-sm light:text-black dark:text-sky-200">
                            {userData.emergency_contact[0].family_rel2}
                          </p>
                        )}
                        <p className="text-sm light:text-black dark:text-sky-200">
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
                        <p className="font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].friend_name1}
                        </p>
                        <p className="text-sm light:text-black dark:text-sky-200">
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
                  <div className="p-4 rounded-lg bg-sky-500/20 transition-all duration-200 hover:bg-sky-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sky-800 dark:text-white">
                          {userData.emergency_contact[0].friend_name2}
                        </p>
                        <p className="text-sm light:text-black dark:text-sky-200">
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

        {/* Plan Details */}
        {showPlanDetails && (
          <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-800 dark:text-white flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-sky-500" />
                Plan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-lg bg-sky-500/20 dark:bg-sky-500/20 space-y-4">
                  <h3 className="text-xl font-semibold text-sky-800 dark:text-white flex items-center gap-2">
                    <CreditCardIcon className="h-5 w-5 text-sky-500" />
                    Subscription Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                      <KeyIcon className="h-4 w-4" />
                      <span className="font-medium">PIN:</span>{" "}
                      {planDetails.pin_number}
                    </p>
                    <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Status:</span>
                      <Badge
                        className={cn(
                          "ml-2",
                          planDetails.subscription?.status === "active"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        )}
                      >
                        {planDetails.subscription?.status}
                      </Badge>
                    </p>
                    <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Expires:</span>{" "}
                      {planDetails.subscription
                        ? formatDate(planDetails.subscription.expire_by)
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-lg bg-sky-500/20 dark:bg-sky-500/20 space-y-4">
                  <h3 className="text-xl font-semibold text-sky-800 dark:text-white flex items-center gap-2">
                    <Tag className="h-5 w-5 text-sky-500" />
                    Plan Details
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">Name:</span>{" "}
                      {planDetails.plan?.item?.name}
                    </p>
                    <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Description:</span>{" "}
                      {planDetails.plan?.item?.description}
                    </p>
                    <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      <span className="font-medium">Amount:</span>{" "}
                      {planDetails.plan?.item
                        ? formatCurrency(
                            planDetails.plan.item.amount,
                            planDetails.plan.item.currency
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-sky-500/20 dark:bg-sky-500/20 space-y-4">
                <h3 className="text-xl font-semibold text-sky-800 dark:text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-sky-500" />
                  Billing Cycle
                </h3>
                <div className="space-y-2">
                  <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Period:</span>{" "}
                    {planDetails.plan?.period}
                  </p>
                  <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Next Charge:</span>{" "}
                    {planDetails.subscription
                      ? formatDate(planDetails.subscription.charge_at)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scan Logs Details */}
        {showScanLogs && (
          <Card className="bg-white/10 dark:bg-white/10 backdrop-blur-md border-sky-200/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-sky-800 dark:text-white flex items-center gap-2">
                <Clock className="h-6 w-6 text-sky-500" />
                Scan Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {scanLogData.results?.map((log) => (
                <div
                  key={log.id}
                  className="p-6 rounded-lg bg-sky-500/20 dark:bg-sky-500/20 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-sky-800 dark:text-white flex items-center gap-2">
                        <User className="h-5 w-5 text-sky-500" />
                        <span className="font-medium">Saviour Name:</span>
                        {log.saviour_name}
                      </h3>
                      <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {log.saviour_phone_number}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        log.is_doctor ? "bg-green-500" : "bg-blue-500",
                        "flex items-center gap-1"
                      )}
                    >
                      {log.is_doctor ? (
                        <Hospital className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      {log.is_doctor ? "Doctor" : "Non-Doctor"}
                    </Badge>
                  </div>
                  {log.is_doctor && (
                    <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                      <Hospital className="h-4 w-4" />
                      <span className="font-medium">Hospital:</span>{" "}
                      {log.hospital_name}
                    </p>
                  )}
                  <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Location:</span>{" "}
                    {log.saviour_location}
                  </p>
                  <p className="text-sky-700 dark:text-sky-200 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Scan Time:</span>{" "}
                    {formatDate(log.created)}
                  </p>
                  <Button
                    variant="outline"
                    className="w-[40%] mt-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                    onClick={() =>
                      window.open(log.saviour_location_url, "_blank")
                    }
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
