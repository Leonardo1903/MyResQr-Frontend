import { useState } from "react";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Checkbox } from "./ui/checkbox";

export default function MedicalInfoStep({ onStepChange, onDataChange }) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodDonor, setBloodDonor] = useState("No");
  const [highBP, setHighBP] = useState("No");
  const [diabetes, setDiabetes] = useState("No");
  const [highCholesterol, setHighCholesterol] = useState("No");
  const [heartIssues, setHeartIssues] = useState("No");
  const [differentlyAbled, setDifferentlyAbled] = useState("No");
  const [asthma, setAsthma] = useState("false");
  const [tuberculosis, setTuberculosis] = useState("false");
  const [mentalIllness, setMentalIllness] = useState("false");
  const [epilepsy, setEpilepsy] = useState("false");
  const [nsaids, setNSAIDs] = useState("No");
  const [steroids, setSteroids] = useState("No");
  const [anticoagulant, setAnticoagulant] = useState("No");
  const [surgery, setSurgery] = useState("No");
  const [organImplant, setOrganImplant] = useState("No");

  const medicalDetails = {
    bloodGroup: bloodGroup,
    bloodDonor: bloodDonor,
    bloodPressure: highBP,
    diabetes: diabetes,
    cholesterol: highCholesterol,
    heartRelated: heartIssues,
    disabled: differentlyAbled,
    reasonDisabled: differentlyAbled,
    asthma: asthma,
    tuberculosis: tuberculosis,
    mentalIllness: mentalIllness,
    epilepsy: epilepsy,
    nsaids: nsaids,
    steroids: steroids,
    anticogulant: anticoagulant,
    surgeryHistory: surgery,
    organImplant: organImplant,
  };

  const handleNext = () => {
    onDataChange(medicalDetails);
    onStepChange(3);
  };

  const handleSkip = () => {
    onDataChange(medicalDetails);
    onStepChange(4);
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
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
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
      <div className="space-y-2 md:space-x-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="highBP" className="text-sky-700 dark:text-sky-300">
            High Blood Pressure
          </Label>
          <RadioGroup
            value={highBP}
            onValueChange={(value) => setHighBP(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="highBP-yes" />
            <Label
              htmlFor="highBP-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="highBP-no" />
            <Label
              htmlFor="highBP-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="diabetes" className="text-sky-700 dark:text-sky-300">
            Diabetes
          </Label>
          <RadioGroup
            value={diabetes}
            onValueChange={(value) => setDiabetes(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="diabetes-yes" />
            <Label
              htmlFor="diabetes-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="diabetes-no" />
            <Label
              htmlFor="diabetes-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="highCholesterol"
            className="text-sky-700 dark:text-sky-300"
          >
            High Cholesterol
          </Label>
          <RadioGroup
            value={highCholesterol}
            onValueChange={(value) => setHighCholesterol(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="highCholesterol-yes" />
            <Label
              htmlFor="highCholesterol-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="highCholesterol-no" />
            <Label
              htmlFor="highCholesterol-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="heartIssues"
            className="text-sky-700 dark:text-sky-300"
          >
            Heart Issues
          </Label>
          <RadioGroup
            value={heartIssues}
            onValueChange={(value) => setHeartIssues(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="heartIssues-yes" />
            <Label
              htmlFor="heartIssues-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="heartIssues-no" />
            <Label
              htmlFor="heartIssues-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="differentlyAbled"
            className="text-sky-700 dark:text-sky-300"
          >
            Differently Abled
          </Label>
          <RadioGroup
            value={differentlyAbled}
            onValueChange={(value) => setDifferentlyAbled(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="differentlyAbled-yes" />
            <Label
              htmlFor="differentlyAbled-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="differentlyAbled-no" />
            <Label
              htmlFor="differentlyAbled-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="asthma" className="text-sky-700 dark:text-sky-300">
            Asthma
          </Label>
          <RadioGroup
            value={asthma}
            onValueChange={(value) => setAsthma(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="true" id="asthma-yes" />
            <Label
              htmlFor="asthma-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="false" id="asthma-no" />
            <Label
              htmlFor="asthma-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="tuberculosis"
            className="text-sky-700 dark:text-sky-300"
          >
            Tuberculosis
          </Label>
          <RadioGroup
            value={tuberculosis}
            onValueChange={(value) => setTuberculosis(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="true" id="tuberculosis-yes" />
            <Label
              htmlFor="tuberculosis-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="false" id="tuberculosis-no" />
            <Label
              htmlFor="tuberculosis-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="mentalIllness"
            className="text-sky-700 dark:text-sky-300"
          >
            Mental Illness
          </Label>
          <RadioGroup
            value={mentalIllness}
            onValueChange={(value) => setMentalIllness(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="true" id="mentalIllness-yes" />
            <Label
              htmlFor="mentalIllness-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="false" id="mentalIllness-no" />
            <Label
              htmlFor="mentalIllness-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="epilepsy" className="text-sky-700 dark:text-sky-300">
            Epilepsy
          </Label>
          <RadioGroup
            value={epilepsy}
            onValueChange={(value) => setEpilepsy(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="true" id="epilepsy-yes" />
            <Label
              htmlFor="epilepsy-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="false" id="epilepsy-no" />
            <Label
              htmlFor="epilepsy-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nsaids" className="text-sky-700 dark:text-sky-300">
            NSAIDs
          </Label>
          <RadioGroup
            value={nsaids}
            onValueChange={(value) => setNSAIDs(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="nsaids-yes" />
            <Label
              htmlFor="nsaids-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="nsaids-no" />
            <Label
              htmlFor="nsaids-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="steroids" className="text-sky-700 dark:text-sky-300">
            Steroids
          </Label>
          <RadioGroup
            value={steroids}
            onValueChange={(value) => setSteroids(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="steroids-yes" />
            <Label
              htmlFor="steroids-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="steroids-no" />
            <Label
              htmlFor="steroids-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="anticoagulant"
            className="text-sky-700 dark:text-sky-300"
          >
            Anticoagulant
          </Label>
          <RadioGroup
            value={anticoagulant}
            onValueChange={(value) => setAnticoagulant(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="anticoagulant-yes" />
            <Label
              htmlFor="anticoagulant-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="anticoagulant-no" />
            <Label
              htmlFor="anticoagulant-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="surgery" className="text-sky-700 dark:text-sky-300">
            Surgery
          </Label>
          <RadioGroup
            value={surgery}
            onValueChange={(value) => setSurgery(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="surgery-yes" />
            <Label
              htmlFor="surgery-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="surgery-no" />
            <Label
              htmlFor="surgery-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="organImplant"
            className="text-sky-700 dark:text-sky-300"
          >
            Organ Implant
          </Label>
          <RadioGroup
            value={organImplant}
            onValueChange={(value) => setOrganImplant(value)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Yes" id="organImplant-yes" />
            <Label
              htmlFor="organImplant-yes"
              className="text-sky-700 dark:text-sky-300"
            >
              Yes
            </Label>
            <RadioGroupItem value="No" id="organImplant-no" />
            <Label
              htmlFor="organImplant-no"
              className="text-sky-700 dark:text-sky-300"
            >
              Don't Know
            </Label>
          </RadioGroup>
        </div>
      </div>
      <Button
        onClick={handleNext}
        className="mt-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
      >
        Next
      </Button>
      <Button
        onClick={handleSkip}
        className="mt-4 mx-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
      >
        Skip
      </Button>
    </div>
  );
}
