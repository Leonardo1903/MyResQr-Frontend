import { Check } from "lucide-react";

export default function StepIndicator({ currentStep, totalSteps }) {
  let adjustedStep = currentStep;
  if (currentStep === 3) {
    adjustedStep = 2;
  } else if (currentStep > 3) {
    adjustedStep = currentStep - 1;
  }
  return (
    <div className="flex items-center justify-center mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              i + 1 <= adjustedStep
                ? "bg-sky-600 text-white"
                : "bg-sky-200 text-sky-600"
            }`}
          >
            {i + 1 < adjustedStep ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`w-12 h-1 mx-1 ${
                i + 1 < adjustedStep ? "bg-sky-600" : "bg-sky-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
