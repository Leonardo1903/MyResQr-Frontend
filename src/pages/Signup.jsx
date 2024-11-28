import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../hooks/use-toast";
import { Separator } from "../components/ui/separator";
import { GridPattern } from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Activity,
  AlertTriangle,
  X,
} from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { idAtom, accessTokenAtom, profileIdAtom } from "../store/UserAtoms";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";

export default function Signup() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [activationKey, setActivationKey] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [formData, setFormData] = useState({
    personal: {
      first_name: "",
      last_name: "",
      email_id: "",
      mobile_number: "",
      whatsapp_number: "",
      gender: "",
      dob: "",
      address: "",
      pin_code: "",
      city: "",
      state: "",
      country: "",
    },
    medical: {
      bloodGroup: "",
      bloodDonor: "",
      highBP: "",
      diabetes: "",
      highCholesterol: "",
      heartIssues: "",
      differentlyAbled: "",
      asthma: "",
      tuberculosis: "",
      mentalIllness: "",
      epilepsy: "",
      nsaids: "",
      steroids: "",
      anticoagulant: "",
      surgery: "",
      organImplant: "",
      regularMeds: "",
      otherCondition: "",
      allergies: "",
      familyHistory: "",
    },
    emergency: [
      { contactName: "", contactPhone: "", relationship: "Family" },
      { contactName: "", contactPhone: "", relationship: "Family" },
      { contactName: "", contactPhone: "", relationship: "Friend" },
      { contactName: "", contactPhone: "", relationship: "Friend" },
    ],
    pin: "",
  });
  const [otp, setOtp] = useState(Array(8).fill(""));
  const inputRefs = useRef([]);
  const [isWhatsAppSame, setIsWhatsAppSame] = useState(true);
  const [avatar, setAvatar] = useState(null);

  const userId = useRecoilValue(idAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  const setProfileId = useSetRecoilState(profileIdAtom);
  const profileId = useRecoilValue(profileIdAtom);

  // <Personal/>
  //<Medical/>
  //<Emergency/>
  //<Pin/>

  // Handle WhatsApp checkbox change
  const handleWhatsAppCheckboxChange = (checked) => {
    setIsWhatsAppSame(checked);
    if (checked) {
      updateFormData(
        "personal",
        "whatsappNumber",
        formData.personal.mobileNumber
      );
    } else {
      updateFormData("personal", "whatsappNumber", "");
    }
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // Remove avatar
  const handleRemoveAvatar = () => {
    setAvatar(null);
    document.getElementById("avatar").value = null;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleActivate = () => {
    setIsActivated(true);
  };

  // Update form data
  const updateFormData = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (section === "emergency" && index !== null) {
        const updatedEmergency = [...prev.emergency];
        updatedEmergency[index][field] = value;
        return { ...prev, emergency: updatedEmergency };
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
    });
  };

  // Validate form data for each step
  const validateStep = () => {
    switch (step) {
      case 1:
        if (
          !formData.personal.firstName ||
          !formData.personal.lastName ||
          !formData.personal.email ||
          !formData.personal.mobileNumber ||
          !formData.personal.gender ||
          !formData.personal.dateOfBirth
        ) {
          toast({
            title: "Error",
            description:
              "Please fill in all required personal information fields.",
          });
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.personal.email)) {
          toast({
            title: "Error",
            description: "Please enter a valid email address.",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.medical.bloodGroup) {
          toast({
            title: "Error",
            description:
              "Please fill in all required medical information fields.",
          });
          return false;
        }
        break;
      case 4:
        for (let contact of formData.emergency) {
          if (!contact.contactName || !contact.contactPhone) {
            toast({
              title: "Error",
              description: "Please fill in all emergency contact fields.",
            });
            return false;
          }
        }
        break;
      case 5:
        if (formData.pin.length !== 8 || !/^\d+$/.test(formData.pin)) {
          toast({ title: "Error", description: "PIN must be 8 digits." });
          return false;
        }
        break;
    }
    return true;
  };

  // Fetch location data based on pincode
  const fetchLocationData = async (pincode) => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        updateFormData("personal", "city", postOffice.Region);
        updateFormData("personal", "state", postOffice.State);
        updateFormData("personal", "country", postOffice.Country);
      } else {
        toast({
          title: "Error",
          description: "Unable to fetch location data for the given pincode.",
        });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching location data.",
      });
    }
  };

  // Handle pincode change
  const handlePincodeChange = (e) => {
    const pincode = e.target.value;
    updateFormData("personal", "pincode", pincode);
    if (pincode.length === 6) {
      fetchLocationData(pincode);
    }
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Update formData.pin
      setFormData((prev) => ({
        ...prev,
        pin: newOtp.join(""),
      }));

      // Move to the next input field if the current one is filled
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key down event
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Api call to create profile
  const createProfile = async (personalDetails) => {
    const response = await axios.post(
      `${baseUrl}/profile/create_profile`,
      personalDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(
        response.data.message || "Error submitting personal details"
      );
    }
    return response.data.data;
  };

  // Api call to create medical details
  const createMedicalDetails = async (medicalDetails, profileId) => {
    const response = await axios.post(
      `${baseUrl}/profile/create_medical`,
      { ...medicalDetails, profile_id: profileId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(
        response.data.message || "Error submitting medical details"
      );
    }
  };

  // Api call to create emergency contacts
  const createEmergencyContacts = async (emergencyContacts, profileId) => {
    const response = await axios.post(
      `${baseUrl}/profile/create_emergency`,
      { emergencyContacts, profile_id: profileId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(
        response.data.message || "Error submitting emergency contacts"
      );
    }
  };

  // Api call to activate PIN
  const activatePin = async (pin, activationKey, profileId) => {
    const response = await axios.post(
      `${baseUrl}/pin_manager/activate_pin`,
      {
        pin,
        key: activationKey,
        profile_id: profileId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data.message || "Error submitting PIN");
    }
  };

  // Api call to verify PIN
  const verifyPin = async (pin, activationKey) => {
    const response = await axios.post(
      `${baseUrl}/pin_manager/activate_pin`,
      {
        pin,
        key: activationKey,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data.message || "Error submitting PIN");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const personalDetails = { ...formData.personal, account: userId };
      const medicalDetails = formData.medical;
      const emergencyContacts = formData.emergency;
      const pin = formData.pin;

      try {
        // Create profile
        try {
          const personalResponse = await createProfile(personalDetails);
          setProfileId(personalResponse.data.data.id);
          toast({
            title: "Success",
            description: "Personal details submitted successfully!",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: `Error submitting personal details: ${error.message}`,
          });
          return;
        }

        // Create medical details
        try {
          await createMedicalDetails(medicalDetails, profileId);
          toast({
            title: "Success",
            description: "Medical details submitted successfully!",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: `Error submitting medical details: ${error.message}`,
          });
          return;
        }

        // Create emergency contacts
        try {
          await createEmergencyContacts(emergencyContacts, profileId);
          toast({
            title: "Success",
            description: "Emergency contacts submitted successfully!",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: `Error submitting emergency contacts: ${error.message}`,
          });
          return;
        }

        // Verify PIN
        try {
          const pinResponse = await verifyPin(pin, activationKey);
          if (
            pinResponse.data.data.message === "Pin Number is already activated"
          ) {
            toast({
              title: "Error",
              description: "Pin Number is already activated",
            });
            navigate("/user-dashboard");
            return;
          } else if (
            pinResponse.data.data.message === "Pin Number is not activated"
          ) {
            // Activate PIN
            try {
              const response = await activatePin(pin, activationKey, profileId);
              if (response.data.data.message === "Pin Activated") {
                toast({
                  title: "Success",
                  description: "Pin Activated",
                });
                navigate("/user-dashboard");
                return;
              }
            } catch (error) {
              toast({
                title: "Error",
                description: `Error activating PIN: ${error.message}`,
              });
              return;
            }
          }
        } catch (error) {
          toast({
            title: "Error",
            description: `Error verifying PIN: ${error.message}`,
          });
          return;
        }

        toast({
          title: "Success",
          description: "Your signup form has been submitted successfully!",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Error",
          description: `An error occurred while submitting your form: ${error.message}`,
        });
      }
    }
  };

  
  // Render step content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
              Personal Information
            </h2>
            <Separator className="bg-sky-200 dark:bg-sky-700" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sky-700 dark:text-sky-300"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.personal.firstName}
                  onChange={(e) =>
                    updateFormData("personal", "firstName", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.personal.lastName}
                  onChange={(e) =>
                    updateFormData("personal", "lastName", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) =>
                    updateFormData("personal", "email", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="mobileNumber"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Mobile Number
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.personal.mobileNumber}
                  onChange={(e) => {
                    updateFormData("personal", "mobileNumber", e.target.value);
                    if (isWhatsAppSame) {
                      updateFormData(
                        "personal",
                        "whatsappNumber",
                        e.target.value
                      );
                    }
                  }}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 flex items-center">
              <Checkbox
                id="isWhatsAppSame"
                checked={isWhatsAppSame}
                onCheckedChange={handleWhatsAppCheckboxChange}
              />
              <Label
                htmlFor="isWhatsAppSame"
                className="text-sky-700 dark:text-sky-300 ml-2"
              >
                Is this your WhatsApp number?
              </Label>
            </div>
            {!isWhatsAppSame && (
              <div className="space-y-2">
                <Label
                  htmlFor="whatsappNumber"
                  className="text-sky-700 dark:text-sky-300"
                >
                  WhatsApp Number
                </Label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  value={formData.personal.whatsappNumber}
                  onChange={(e) =>
                    updateFormData("personal", "whatsappNumber", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Gender
                </Label>
                <Select
                  onValueChange={(value) =>
                    updateFormData("personal", "gender", value)
                  }
                >
                  <SelectTrigger className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="dateOfBirth"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personal.dateOfBirth}
                  onChange={(e) =>
                    updateFormData("personal", "dateOfBirth", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="avatar"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Upload Avatar
                </Label>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    onClick={() => document.getElementById("avatar").click()}
                    className="bg-sky-600 hover:bg-sky-800 text-white px-2 rounded-md"
                  >
                    Choose File
                  </Button>
                </div>
                <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-300 mt-2">
                  <span>{avatar ? avatar.name : "No file chosen"}</span>
                  {avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Input
                  id="avatar"
                  type="file"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sky-700 dark:text-sky-300"
              >
                Address
              </Label>
              <Input
                id="address"
                value={formData.personal.address}
                onChange={(e) =>
                  updateFormData("personal", "address", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="pincode"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  value={formData.personal.pincode}
                  onChange={handlePincodeChange}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sky-700 dark:text-sky-300"
                >
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.personal.city}
                  onChange={(e) =>
                    updateFormData("personal", "city", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="state"
                  className="text-sky-700 dark:text-sky-300"
                >
                  State
                </Label>
                <Input
                  id="state"
                  value={formData.personal.state}
                  onChange={(e) =>
                    updateFormData("personal", "state", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="country"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Country
                </Label>
                <Input
                  id="country"
                  value={formData.personal.country}
                  onChange={(e) =>
                    updateFormData("personal", "country", e.target.value)
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
              Medical Information
            </h2>
            <Separator className="bg-sky-200 dark:bg-sky-700" />
            <div className="space-y-2">
              <Label className="text-sky-700 dark:text-sky-300">
                Blood Group
              </Label>
              <RadioGroup
                value={formData.medical.bloodGroup}
                onValueChange={(value) =>
                  updateFormData("medical", "bloodGroup", value)
                }
                className="grid grid-cols-4 gap-2"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`bloodGroup-${type}`} />
                      <Label
                        htmlFor={`bloodGroup-${type}`}
                        className="text-sky-700 dark:text-sky-300"
                      >
                        {type}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="text-sky-700 dark:text-sky-300">
                Are you a blood donor?
              </Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bloodDonor"
                  checked={formData.medical.bloodDonor}
                  onCheckedChange={(checked) =>
                    updateFormData("medical", "bloodDonor", checked)
                  }
                />
                <Label
                  htmlFor="bloodDonor"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Yes, I am a blood donor
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="highBP"
                  className="text-sky-700 dark:text-sky-300"
                >
                  High Blood Pressure
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highBP"
                    checked={formData.medical.highBP}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "highBP", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="diabetes"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Diabetes
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diabetes"
                    checked={formData.medical.diabetes}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "diabetes", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="highCholesterol"
                  className="text-sky-700 dark:text-sky-300"
                >
                  High Cholesterol
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highCholesterol"
                    checked={formData.medical.highCholesterol}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "highCholesterol", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="heartIssues"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Heart Issues
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="heartIssues"
                    checked={formData.medical.heartIssues}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "heartIssues", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="differentlyAbled"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Differently Abled
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="differentlyAbled"
                    checked={formData.medical.differentlyAbled}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "differentlyAbled", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="asthma"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Asthma
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="asthma"
                    checked={formData.medical.asthma}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "asthma", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="tuberculosis"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Tuberculosis
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tuberculosis"
                    checked={formData.medical.tuberculosis}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "tuberculosis", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="mentalIllness"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Mental Illness
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mentalIllness"
                    checked={formData.medical.mentalIllness}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "mentalIllness", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="epilepsy"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Epilepsy
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="epilepsy"
                    checked={formData.medical.epilepsy}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "epilepsy", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="nsaids"
                  className="text-sky-700 dark:text-sky-300"
                >
                  NSAIDs
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nsaids"
                    checked={formData.medical.nsaids}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "nsaids", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="steroids"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Steroids
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="steroids"
                    checked={formData.medical.steroids}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "steroids", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="anticoagulant"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Anticoagulant
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anticoagulant"
                    checked={formData.medical.anticoagulant}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "anticoagulant", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="surgery"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Surgery
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="surgery"
                    checked={formData.medical.surgery}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "surgery", checked)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="organImplant"
                  className="text-sky-700 dark:text-sky-300"
                >
                  Organ Implant
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="organImplant"
                    checked={formData.medical.organImplant}
                    onCheckedChange={(checked) =>
                      updateFormData("medical", "organImplant", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
              Additional Medical Information
            </h2>
            <Separator className="bg-sky-200 dark:bg-sky-700" />
            <div className="space-y-2">
              <Label
                htmlFor="regularMeds"
                className="text-sky-700 dark:text-sky-300"
              >
                Regular Medications
              </Label>
              <Input
                id="regularMeds"
                value={formData.medical.regularMeds}
                onChange={(e) =>
                  updateFormData("medical", "regularMeds", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="otherCondition"
                className="text-sky-700 dark:text-sky-300"
              >
                Other Conditions
              </Label>
              <Input
                id="otherCondition"
                value={formData.medical.otherCondition}
                onChange={(e) =>
                  updateFormData("medical", "otherCondition", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="allergies"
                className="text-sky-700 dark:text-sky-300"
              >
                Allergies
              </Label>
              <Input
                id="allergies"
                value={formData.medical.allergies}
                onChange={(e) =>
                  updateFormData("medical", "allergies", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="familyHistory"
                className="text-sky-700 dark:text-sky-300"
              >
                Family Medical History
              </Label>
              <Input
                id="familyHistory"
                value={formData.medical.familyHistory}
                onChange={(e) =>
                  updateFormData("medical", "familyHistory", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
              Emergency Contact Information
            </h2>
            <Separator className="bg-sky-200 dark:bg-sky-700" />
            <div className="space-y-4">
              {formData.emergency.map((contact, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor={`contactName-${index}`}
                      className="text-sky-700 dark:text-sky-300"
                    >
                      Contact Name
                    </Label>
                    <Input
                      id={`contactName-${index}`}
                      value={contact.contactName}
                      onChange={(e) =>
                        updateFormData(
                          "emergency",
                          "contactName",
                          e.target.value,
                          index
                        )
                      }
                      className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`contactPhone-${index}`}
                      className="text-sky-700 dark:text-sky-300"
                    >
                      Contact Phone
                    </Label>
                    <Input
                      id={`contactPhone-${index}`}
                      value={contact.contactPhone}
                      onChange={(e) =>
                        updateFormData(
                          "emergency",
                          "contactPhone",
                          e.target.value,
                          index
                        )
                      }
                      className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`relationship-${index}`}
                      className="text-sky-700 dark:text-sky-300"
                    >
                      Relationship
                    </Label>
                    <Input
                      id={`relationship-${index}`}
                      value={contact.relationship}
                      onChange={(e) =>
                        updateFormData(
                          "emergency",
                          "relationship",
                          e.target.value,
                          index
                        )
                      }
                      className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
              Emergency Contact Information
            </h2>
            <Separator className="bg-sky-200 dark:bg-sky-700" />
            <div className="space-y-4">
              {formData.emergency.map((contact, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor={`contactName-${index}`}
                      className="text-sky-700 dark:text-sky-300"
                    >
                      Contact Name
                    </Label>
                    <Input
                      id={`contactName-${index}`}
                      value={contact.contactName}
                      onChange={(e) =>
                        updateEmergencyContact(
                          index,
                          "contactName",
                          e.target.value
                        )
                      }
                      className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`contactPhone-${index}`}
                      className="text-sky-700 dark:text-sky-300"
                    >
                      Contact Phone
                    </Label>
                    <Input
                      id={`contactPhone-${index}`}
                      value={contact.contactPhone}
                      onChange={(e) =>
                        updateEmergencyContact(
                          index,
                          "contactPhone",
                          e.target.value
                        )
                      }
                      className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`relationship-${index}`}
                      className="text-sky-700 dark:text-sky-300"
                    >
                      Relationship
                    </Label>
                    <Input
                      id={`relationship-${index}`}
                      value={contact.relationship}
                      onChange={(e) =>
                        updateEmergencyContact(
                          index,
                          "relationship",
                          e.target.value
                        )
                      }
                      className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
              Emergency Contact
            </h2>
            <Separator className="bg-sky-200 dark:bg-sky-700" />
            <div className="space-y-2">
              <Label
                htmlFor="contactName"
                className="text-sky-700 dark:text-sky-300"
              >
                Contact Name
              </Label>
              <Input
                id="contactName"
                value={formData.emergency.contactName}
                onChange={(e) =>
                  updateFormData("emergency", "contactName", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contactPhone"
                className="text-sky-700 dark:text-sky-300"
              >
                Contact Phone
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.emergency.contactPhone}
                onChange={(e) =>
                  updateFormData("emergency", "contactPhone", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="relationship"
                className="text-sky-700 dark:text-sky-300"
              >
                Relationship
              </Label>
              <Input
                id="relationship"
                value={formData.emergency.relationship}
                onChange={(e) =>
                  updateFormData("emergency", "relationship", e.target.value)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            {!isActivated ? (
              <div>
                <h2>Welcome, {formData.personal.mobileNumber}</h2>
                <Button
                  type="button"
                  className="mt-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
                  onClick={handleActivate}
                >
                  Activate PIN
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
                  PIN Activation
                </h2>
                <Separator className="bg-sky-200 dark:bg-sky-700" />
                <div className="space-y-2">
                  <Label
                    htmlFor="pin"
                    className="text-sky-700 dark:text-sky-300"
                  >
                    8-Digit PIN
                  </Label>
                  <div className="flex space-x-2 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index + 1}`}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 text-center text-2xl bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100"
                        maxLength={1}
                        required
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="activationKey"
                    className="text-sky-700 dark:text-sky-300"
                  >
                    Activation Key
                  </Label>
                  <Input
                    id="activationKey"
                    type="text"
                    value={activationKey}
                    onChange={(e) => setActivationKey(e.target.value)}
                    className="w-full text-center text-2xl bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-x-hidden">
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
          [15, 10],
          [10, 15],
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
          "fixed inset-0 h-full w-full skew-y-12 overflow-hidden"
        )}
      />
      <div className="z-10 absolute inset-0 w-full h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl  rounded-2xl shadow-xl bg-sky-100 bg-opacity-30 dark:bg-sky-800 dark:bg-opacity-30 backdrop-blur-md border border-sky-200 dark:border-sky-700 mt-60">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side with form */}
            <div className="w-full md:w-2/3 p-8 md:p-12 ">
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStepContent()}
                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {step < 5 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className={`flex items-center ${
                        step === 1 ? "ml-auto" : ""
                      }`}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" className="ml-auto flex items-center">
                      Submit
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
            {/* Right side with logo */}
            <div className="hidden md:flex md:w-1/3 bg-sky-200 bg-opacity-30 dark:bg-sky-900 dark:bg-opacity-30 p-12 flex-col justify-center items-center text-center">
              {/* Form step indicator */}
              <StepIndicator currentStep={step} totalSteps={4} />
              <div className="w-32 h-32 mb-8 text-sky-600 dark:text-sky-300">
                {step === 1 && <User size={128} />}
                {step === 2 && <Activity size={128} />}
                {step === 3 && <Activity size={128} />}
                {step === 4 && <Phone size={128} />}
                {step === 5 && <AlertTriangle size={128} />}
              </div>
              <h2 className="text-3xl font-bold text-sky-800 dark:text-sky-100 mb-4">
                Sign Up
              </h2>
              <p className="text-sky-700 dark:text-sky-300">
                Create your account and join our community.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
