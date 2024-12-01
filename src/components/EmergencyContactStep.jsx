import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenAtom, profileIdAtom } from "../store/UserAtoms";

export default function EmergencyContactStep({ onStepChange }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [emergencyContacts, setEmergencyContacts] = useState([
    { contactName: "", contactPhone: "", relationship: "Family" },
    { contactName: "", contactPhone: "", relationship: "Family" },
    { contactName: "", contactPhone: "", relationship: "Friend" },
    { contactName: "", contactPhone: "", relationship: "Friend" },
  ]);
  const toast = useToast();

  const profileId = useRecoilValue(profileIdAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const updateEmergencyContact = (field, value, index) => {
    const newContacts = [...emergencyContacts];
    newContacts[index][field] = value;
    setEmergencyContacts(newContacts);
  };

  const transformData = () => {
    const [family1, family2, friend1, friend2] = emergencyContacts;

    return {
      profile: profileId,
      family_name1: family1.contactName,
      family_name2: family2.contactName,
      friend_name1: friend1.contactName,
      friend_name2: friend2.contactName,
      family_phone1: family1.contactPhone,
      family_phone2: family2.contactPhone,
      friend_phone1: friend1.contactPhone,
      friend_phone2: friend2.contactPhone,
    };
  };

  const handleSubmit = async () => {
    const requestBody = transformData();

    try {
      const response = await axios.post(
        `${baseUrl}/profile/create_emergency`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          response.data.message || "Error submitting emergency contacts"
        );
      }
      onStepChange(5);
      toast({
        title: "Success",
        description: "Emergency contacts submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message ||
          "An error occurred while submitting emergency contacts.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
        Emergency Contact Information
      </h2>
      <Separator className="bg-sky-200 dark:bg-sky-700" />
      <div className="space-y-4">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  updateEmergencyContact("contactName", e.target.value, index)
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
                  updateEmergencyContact("contactPhone", e.target.value, index)
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
                  updateEmergencyContact("relationship", e.target.value, index)
                }
                className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                required
              />
            </div>
          </div>
        ))}
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
