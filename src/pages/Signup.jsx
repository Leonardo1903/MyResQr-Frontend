import { useState } from "react";
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
import {
  ArrowLeft,
  ArrowRight,
  User,
  Check,
  Phone,
  Activity,
  AlertTriangle,
} from "lucide-react";

export default function Signup() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    },
    medical: {
      bloodGroup: "",
      bloodDonor: "",
      conditions: "",
      additionalMedicalInfo: "", 
    },
    emergency: {
      contactName: "",
      contactPhone: "",
      relationship: "",
    },
    pin: "",
  });

  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

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
        if (!isValidEmail(formData.personal.email)) {
          toast({
            title: "Error",
            description: "Please enter a valid email address.",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.medical.bloodGroup || !formData.medical.bloodDonor) {
          toast({
            title: "Error",
            description:
              "Please fill in all required medical information fields.",
          });
          return false;
        }
        break;
      case 3:
        if (
          !formData.emergency.contactName ||
          !formData.emergency.contactPhone ||
          !formData.emergency.relationship
        ) {
          toast({
            title: "Error",
            description: "Please fill in all emergency contact fields.",
          });
          return false;
        }
        break;
      case 4:
        if (formData.pin.length !== 8 || !/^\d+$/.test(formData.pin)) {
          toast({ title: "Error", description: "PIN must be 8 digits." });
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form submitted:", formData);
      toast({
        title: "Success",
        description: "Your signup form has been submitted successfully!",
      });
    }
  };

  const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
      <div className="flex items-center justify-center mb-6">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                i + 1 <= currentStep
                  ? "bg-sky-600 text-white"
                  : "bg-sky-200 text-sky-600"
              }`}
            >
              {i + 1 < currentStep ? (
                <Check className="w-4 h-4" /> 
              ) : (
                i + 1
              )}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`w-12 h-1 mx-1 ${
                  i + 1 < currentStep ? "bg-sky-600" : "bg-sky-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

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
                <Label htmlFor="firstName" className="text-sky-700 dark:text-sky-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.personal.firstName}
                  onChange={(e) => updateFormData("personal", "firstName", e.target.value)}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sky-700 dark:text-sky-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.personal.lastName}
                  onChange={(e) => updateFormData("personal", "lastName", e.target.value)}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sky-700 dark:text-sky-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.personal.email}
                onChange={(e) => updateFormData("personal", "email", e.target.value)}
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-sky-700 dark:text-sky-300">
                  Mobile Number
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.personal.mobileNumber}
                  onChange={(e) => updateFormData("personal", "mobileNumber", e.target.value)}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sky-700 dark:text-sky-300">
                  Gender
                </Label>
                <Select
                  onValueChange={(value) => updateFormData("personal", "gender", value)}
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
                <Label htmlFor="dateOfBirth" className="text-sky-700 dark:text-sky-300">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personal.dateOfBirth}
                  onChange={(e) => updateFormData("personal", "dateOfBirth", e.target.value)}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sky-700 dark:text-sky-300">
                Address
              </Label>
              <Input
                id="address"
                value={formData.personal.address}
                onChange={(e) => updateFormData("personal", "address", e.target.value)}
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sky-700 dark:text-sky-300">
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.personal.city}
                  onChange={(e) => updateFormData("personal", "city", e.target.value)}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sky-700 dark:text-sky-300">
                  State
                </Label>
                <Input
                  id="state"
                  value={formData.personal.state}
                  onChange={(e) => updateFormData("personal", "state", e.target.value)}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sky-700 dark:text-sky-300">
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  value={formData.personal.zipCode}
                  onChange={(e) => updateFormData("personal", "zipCode", e.target.value)}
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sky-700 dark:text-sky-300">
                  Country
                </Label>
                <Input
                  id="country"
                  value={formData.personal.country}
                  onChange={(e) => updateFormData("personal", "country", e.target.value)}
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
              <RadioGroup
                value={formData.medical.bloodDonor}
                onValueChange={(value) =>
                  updateFormData("medical", "bloodDonor", value)
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="bloodDonor-yes" />
                  <Label
                    htmlFor="bloodDonor-yes"
                    className="text-sky-700 dark:text-sky-300"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="bloodDonor-no" />
                  <Label
                    htmlFor="bloodDonor-no"
                    className="text-sky-700 dark:text-sky-300"
                  >
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              
              <Label htmlFor="additionalMedicalInfo" className="text-sky-700 dark:text-sky-300">
                Any Medical Condition
              </Label>
              <textarea
                id="conditions"
                value={formData.medical.conditions}
                onChange={(e) => updateFormData("medical", "conditions", e.target.value)}
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 w-full h-10 p-2 rounded-md"
              />
              
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalMedicalInfo" className="text-sky-700 dark:text-sky-300">
                Additional Medical Information
              </Label>
              <textarea
                id="additionalMedicalInfo"
                value={formData.medical.additionalMedicalInfo}
                onChange={(e) => updateFormData("medical", "additionalMedicalInfo", e.target.value)}
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 w-full h-20 p-2 rounded-md"
              />
            </div>
          </div>
        );
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
              <RadioGroup
                value={formData.medical.bloodDonor}
                onValueChange={(value) =>
                  updateFormData("medical", "bloodDonor", value)
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="bloodDonor-yes" />
                  <Label
                    htmlFor="bloodDonor-yes"
                    className="text-sky-700 dark:text-sky-300"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="bloodDonor-no" />
                  <Label
                    htmlFor="bloodDonor-no"
                    className="text-sky-700 dark:text-sky-300"
                  >
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="text-sky-700 dark:text-sky-300">
                Medical Conditions
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {["High BP", "Diabetes", "Heart Issues", "Asthma", "High Cholesterol","Differently Abled","Tuberculosis","Mental Illness", "Epilepsy"].map(
                  (condition) => (
                    <div
                      key={condition}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={condition}
                        checked={formData.medical.conditions.includes(
                          condition
                        )}
                        onCheckedChange={(checked) => {
                          const updatedConditions = checked
                            ? [...formData.medical.conditions, condition]
                            : formData.medical.conditions.filter(
                                (c) => c !== condition
                              );
                          updateFormData(
                            "medical",
                            "conditions",
                            updatedConditions
                          );
                        }}
                      />
                      <Label
                        htmlFor={condition}
                        className="text-sky-700 dark:text-sky-300"
                      >
                        {condition}
                      </Label>
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
        <Label htmlFor="nsaids" className="text-sky-700 dark:text-sky-300">
          NSAIDs
        </Label>
        <Input
          id="nsaids"
          value={formData.medical.nsaids}
          onChange={(e) => updateFormData("medical", "nsaids", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="steroids" className="text-sky-700 dark:text-sky-300">
          Steroids
        </Label>
        <Input
          id="steroids"
          value={formData.medical.steroids}
          onChange={(e) => updateFormData("medical", "steroids", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="anticoagulant" className="text-sky-700 dark:text-sky-300">
          Anticoagulant
        </Label>
        <Input
          id="anticoagulant"
          value={formData.medical.anticoagulant}
          onChange={(e) => updateFormData("medical", "anticoagulant", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="surgery" className="text-sky-700 dark:text-sky-300">
          Surgery
        </Label>
        <Input
          id="surgery"
          value={formData.medical.surgery}
          onChange={(e) => updateFormData("medical", "surgery", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="organImplant" className="text-sky-700 dark:text-sky-300">
          Organ Implant
        </Label>
        <Input
          id="organImplant"
          value={formData.medical.organImplant}
          onChange={(e) => updateFormData("medical", "organImplant", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="regularMeds" className="text-sky-700 dark:text-sky-300">
          Regular Medications
        </Label>
        <Input
          id="regularMeds"
          value={formData.medical.regularMeds}
          onChange={(e) => updateFormData("medical", "regularMeds", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="allergies" className="text-sky-700 dark:text-sky-300">
          Allergies
        </Label>
        <Input
          id="allergies"
          value={formData.medical.allergies}
          onChange={(e) => updateFormData("medical", "allergies", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="familyHistory" className="text-sky-700 dark:text-sky-300">
          Family Medical History
        </Label>
        <Input
          id="familyHistory"
          value={formData.medical.familyHistory}
          onChange={(e) => updateFormData("medical", "familyHistory", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
        </div>
        <div className="space-y-2">
        <Label htmlFor="otherCondition" className="text-sky-700 dark:text-sky-300">
          Other Conditions
        </Label>
        <Input
          id="otherCondition"
          value={formData.medical.otherCondition}
          onChange={(e) => updateFormData("medical", "otherCondition", e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
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
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
              PIN Activation
            </h2>
            <Separator className="bg-sky-200 dark:bg-sky-700" />
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-sky-700 dark:text-sky-300">
                8-Digit PIN
              </Label>
              <Input
                id="pin"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                value={formData.pin}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pin: e.target.value }))
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="z-10 absolute inset-0 w-full h-full flex items-center justify-center p-4 my-20">
        <Card className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl bg-sky-100 bg-opacity-30 dark:bg-sky-800 dark:bg-opacity-30 backdrop-blur-md border border-sky-200 dark:border-sky-700">
          <div className="flex flex-col md:flex-row">
              {/* Left side with form */}
             <div className="w-full md:w-2/3 p-8 md:p-12">
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
                  {step < 4 ? (
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
            <StepIndicator currentStep={step} totalSteps={4} />
              <div className="w-32 h-32 mb-8 text-sky-600 dark:text-sky-300">
                {step === 1 && <User size={128} />}
                {step === 2 && <Activity size={128} />}
                {step === 3 && <Phone size={128} />}
                {step === 4 && <AlertTriangle size={128} />}
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
