import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { accessTokenAtom } from "../store/UserAtoms";
import { useRecoilValue } from "recoil";

export default function AdditionalMedicalInfoStep({
  onStepChange,
  onDataChange,
  medicalInfo,
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [regularMeds, setRegularMeds] = useState("");
  const [otherCondition, setOtherCondition] = useState("");
  const [allergies, setAllergies] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const toast = useToast();
  const accessToken = useRecoilValue(accessTokenAtom);

  const additionalMedicalDetails = {
    medications: regularMeds,
    otherMedicalCondition: otherCondition,
    allergies: allergies,
    familyMedicalHistory: familyHistory,
  };

  const handleSubmit = async () => {
    const combinedData = {
      ...medicalInfo,
      ...additionalMedicalDetails,
    };
    try {
      const response = await axios.post(
        `${baseUrl}/profile/create_medical`,
        combinedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          response.data.message || "Error submitting medical details"
        );
      }
      onStepChange(4);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message ||
          "An error occurred while submitting medical details.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
        Additional Medical Information
      </h2>
      <Separator className="bg-sky-200 dark:bg-sky-700" />
      <div className="space-y-2">
        <Label htmlFor="regularMeds" className="text-sky-700 dark:text-sky-300">
          Regular Medications
        </Label>
        <Input
          id="regularMeds"
          value={regularMeds}
          onChange={(e) => {
            setRegularMeds(e.target.value);
            onDataChange({
              ...additionalMedicalDetails,
              regularMeds: e.target.value,
            });
          }}
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
          value={otherCondition}
          onChange={(e) => {
            setOtherCondition(e.target.value);
            onDataChange({
              ...additionalMedicalDetails,
              otherCondition: e.target.value,
            });
          }}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="allergies" className="text-sky-700 dark:text-sky-300">
          Allergies
        </Label>
        <Input
          id="allergies"
          value={allergies}
          onChange={(e) => {
            setAllergies(e.target.value);
            onDataChange({
              ...additionalMedicalDetails,
              allergies: e.target.value,
            });
          }}
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
          value={familyHistory}
          onChange={(e) => {
            setFamilyHistory(e.target.value);
            onDataChange({
              ...additionalMedicalDetails,
              familyHistory: e.target.value,
            });
          }}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="mt-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
      >
        Next
      </Button>
    </div>
  );
}
