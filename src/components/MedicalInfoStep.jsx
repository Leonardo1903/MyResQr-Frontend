import { useState} from "react";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";

export default function MedicalInfoStep({
  onStepChange,
  onDataChange,
}) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodDonor, setBloodDonor] = useState(false);
  const [highBP, setHighBP] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [highCholesterol, setHighCholesterol] = useState("");
  const [heartIssues, setHeartIssues] = useState("");
  const [differentlyAbled, setDifferentlyAbled] = useState("");
  const [asthma, setAsthma] = useState("");
  const [tuberculosis, setTuberculosis] = useState("");
  const [mentalIllness, setMentalIllness] = useState("");
  const [epilepsy, setEpilepsy] = useState("");
  const [nsaids, setNSAIDs] = useState("");
  const [steroids, setSteroids] = useState("");
  const [anticoagulant, setAnticoagulant] = useState("");
  const [surgery, setSurgery] = useState("");
  const [organImplant, setOrganImplant] = useState("");

  const medicalDetails = {
    bloodGroup: bloodGroup,
    bloodDonor: bloodDonor ? "Yes" : "No",
    bloodPressure: highBP ? "Yes" : "No",
    diabetes: diabetes ? "Yes" : "No",
    cholesterol: highCholesterol ? "Yes" : "No",
    heartRelated: heartIssues ? "Yes" : "No",
    disabled: differentlyAbled ? "Yes" : "No",
    reasonDisabled: differentlyAbled ? "Yes" : "No",
    asthma: asthma ? "true" : "false",
    tuberculosis: tuberculosis ? "true" : "false",
    mentalIllness: mentalIllness ? "true" : "false",
    epilepsy: epilepsy ? "true" : "false",
    nsaids: nsaids ? "Yes" : "No",
    steroids: steroids ? "Yes" : "No",
    anticogulant: anticoagulant ? "Yes" : "No",
    surgeryHistory: surgery ? "Yes" : "No",
    organImplant: organImplant ? "Yes" : "No",
  };

  const handleNext = () => {
    onDataChange(medicalDetails);
    onStepChange(3);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
        Medical Information
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        onClick={handleNext}
        className="mt-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
      >
        Next
      </Button>
    </div>
  );
}
