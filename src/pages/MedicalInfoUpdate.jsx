import { useState, useEffect } from "react";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenAtom, userDashboardDataAtom } from "../store/UserAtoms";
import axios from "axios";
import GridPattern from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function MedicalInfoUpdate() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const userData = useRecoilValue(userDashboardDataAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  const setUserDashboardData = useSetRecoilState(userDashboardDataAtom);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [bloodGroup, setBloodGroup] = useState(userData.medical_detail[0].blood_group);
  const [bloodDonor, setBloodDonor] = useState(userData.medical_detail[0].blood_donor === "Yes");
  const [highBP, setHighBP] = useState(userData.medical_detail[0].blood_pressure === "Yes");
  const [diabetes, setDiabetes] = useState(userData.medical_detail[0].diabetes === "Yes");
  const [highCholesterol, setHighCholesterol] = useState(userData.medical_detail[0].cholesterol === "Yes");
  const [heartIssues, setHeartIssues] = useState(userData.medical_detail[0].heart_related === "Yes");
  const [differentlyAbled, setDifferentlyAbled] = useState(userData.medical_detail[0].disabled === "Yes");
  const [asthma, setAsthma] = useState(userData.medical_detail[0].asthma === "true");
  const [tuberculosis, setTuberculosis] = useState(userData.medical_detail[0].tuberculosis === "true");
  const [mentalIllness, setMentalIllness] = useState(userData.medical_detail[0].mental_illness === "true");
  const [epilepsy, setEpilepsy] = useState(userData.medical_detail[0].epilepsy === "true");
  const [nsaids, setNSAIDs] = useState(userData.medical_detail[0].nsaids === "Yes");
  const [steroids, setSteroids] = useState(userData.medical_detail[0].steroids === "Yes");
  const [anticoagulant, setAnticoagulant] = useState(userData.medical_detail[0].anticogulant === "Yes");
  const [surgery, setSurgery] = useState(userData.medical_detail[0].surgery_history === "Yes");
  const [organImplant, setOrganImplant] = useState(userData.medical_detail[0].organ_implant === "Yes");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const medicalDetails = {
      blood_group: bloodGroup,
      blood_donor: bloodDonor ? "Yes" : "No",
      blood_pressure: highBP ? "Yes" : "No",
      diabetes: diabetes ? "Yes" : "No",
      cholesterol: highCholesterol ? "Yes" : "No",
      heart_related: heartIssues ? "Yes" : "No",
      disabled: differentlyAbled ? "Yes" : "No",
      reason_disabled: differentlyAbled ? "Yes" : "No",
      asthma: asthma ? "true" : "false",
      tuberculosis: tuberculosis ? "true" : "false",
      mental_illness: mentalIllness ? "true" : "false",
      epilepsy: epilepsy ? "true" : "false",
      nsaids: nsaids ? "Yes" : "No",
      steroids: steroids ? "Yes" : "No",
      anticogulant: anticoagulant ? "Yes" : "No",
      surgery_history: surgery ? "Yes" : "No",
      organ_implant: organImplant ? "Yes" : "No",
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.put(
        `${baseUrl}/profile/update_medical/${userData.id}`,
        medicalDetails,
        { headers }
      );

      if (response.status < 200 || response.status >= 300) {
        toast({
          title: "Error",
          description: response.data.message || "An error occurred.",
          variant: "destructive",
        });
        return;
      }

      setUserDashboardData((prevData) => ({
        ...prevData,
        medical_detail: [response.data],
      }));
      navigate("/user-dashboard", { replace: true });
      toast({
        title: "Success",
        description: "Medical information updated successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
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
        <Card className="w-full max-w-4xl rounded-2xl shadow-xl bg-sky-100 bg-opacity-30 dark:bg-sky-800 dark:bg-opacity-30 backdrop-blur-md border border-sky-200 dark:border-sky-700 mt-60">
          <div className="p-8 md:p-12 overflow-y-auto">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
                Update Medical Information
              </h2>
              <Separator className="bg-sky-200 dark:bg-sky-700" />
              <div className="space-y-2">
                <Label className="text-sky-700 dark:text-sky-300">Blood Group</Label>
                <RadioGroup
                  value={bloodGroup}
                  onValueChange={(value) => setBloodGroup(value)}
                  className="grid grid-cols-4 gap-2"
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`bloodGroup-${type}`} />
                      <Label
                        htmlFor={`bloodGroup-${type}`}
                        className="text-sky-700 dark:text-sky-300"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label className="text-sky-700 dark:text-sky-300">
                  Are you a blood donor?
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bloodDonor"
                    checked={bloodDonor}
                    onCheckedChange={(checked) => setBloodDonor(checked)}
                  />
                  <Label
                    htmlFor="bloodDonor"
                    className="text-sky-700 dark:text-sky-300"
                  >
                    Yes, I am a blood donor
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highBP" className="text-sky-700 dark:text-sky-300">
                    High Blood Pressure
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="highBP"
                      checked={highBP}
                      onCheckedChange={(checked) => setHighBP(checked)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diabetes" className="text-sky-700 dark:text-sky-300">
                    Diabetes
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="diabetes"
                      checked={diabetes}
                      onCheckedChange={(checked) => setDiabetes(checked)}
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
                      checked={highCholesterol}
                      onCheckedChange={(checked) => setHighCholesterol(checked)}
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
                      checked={heartIssues}
                      onCheckedChange={(checked) => setHeartIssues(checked)}
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
                      checked={differentlyAbled}
                      onCheckedChange={(checked) => setDifferentlyAbled(checked)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asthma" className="text-sky-700 dark:text-sky-300">
                    Asthma
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="asthma"
                      checked={asthma}
                      onCheckedChange={(checked) => setAsthma(checked)}
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
                      checked={tuberculosis}
                      onCheckedChange={(checked) => setTuberculosis(checked)}
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
                      checked={mentalIllness}
                      onCheckedChange={(checked) => setMentalIllness(checked)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="epilepsy" className="text-sky-700 dark:text-sky-300">
                    Epilepsy
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="epilepsy"
                      checked={epilepsy}
                      onCheckedChange={(checked) => setEpilepsy(checked)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nsaids" className="text-sky-700 dark:text-sky-300">
                    NSAIDs
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nsaids"
                      checked={nsaids}
                      onCheckedChange={(checked) => setNSAIDs(checked)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="steroids" className="text-sky-700 dark:text-sky-300">
                    Steroids
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="steroids"
                      checked={steroids}
                      onCheckedChange={(checked) => setSteroids(checked)}
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
                      checked={anticoagulant}
                      onCheckedChange={(checked) => setAnticoagulant(checked)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surgery" className="text-sky-700 dark:text-sky-300">
                    Surgery
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="surgery"
                      checked={surgery}
                      onCheckedChange={(checked) => setSurgery(checked)}
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
                      checked={organImplant}
                      onCheckedChange={(checked) => setOrganImplant(checked)}
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                className="mt-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
              >
                Update
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}