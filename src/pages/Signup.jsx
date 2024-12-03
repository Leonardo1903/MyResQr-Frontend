import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import StepIndicator from "../components/StepIndicator";
import PersonalInfoStep from "../components/PersonalInfoStep";
import MedicalInfoStep from "../components/MedicalInfoStep";
import AdditionalMedicalInfoStep from "../components/AdditionalMedicalInfoStep";
import EmergencyContactStep from "../components/EmergencyContactStep";
import PinActivationStep from "../components/PinActivationStep";
import { User, Activity, Phone, AlertTriangle } from "lucide-react";
import GridPattern from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";

export default function Signup({ initialStep = 1 }) {
  const [step, setStep] = useState(initialStep);
  const [medicalInfo, setMedicalInfo] = useState({});

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleMedicalInfoChange = (data) => {
    setMedicalInfo(data);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep onStepChange={handleStepChange} />;
      case 2:
        return (
          <MedicalInfoStep
            onStepChange={handleStepChange}
            onDataChange={handleMedicalInfoChange}
          />
        );
      case 3:
        return (
          <AdditionalMedicalInfoStep
            onStepChange={handleStepChange}
            medicalInfo={medicalInfo}
          />
        );
      case 4:
        return <EmergencyContactStep onStepChange={handleStepChange} />;
      case 5:
        return <PinActivationStep onStepChange={handleStepChange} />;
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
            <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto">
              {/* Left Side with form */}
              <form className="space-y-6">{renderStepContent()}</form>
            </div>
            <div className="hidden md:flex md:w-1/3 bg-sky-200 bg-opacity-30 dark:bg-sky-900 dark:bg-opacity-30 p-12 flex-col justify-center items-center text-center">
              {/* Right Side with step indicator and logo */}
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
