import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { profileIdAtom, genderAtom } from "../store/UserAtoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function EmergencyContactStep({ onStepChange }) {
  const baseUrl = "http://3.108.8.215/api/v1";
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      contactName: "",
      contactPhone: "",
      relationship: "Family",
      nominee: false,
    },
    {
      contactName: "",
      contactPhone: "",
      relationship: "Family",
      nominee: false,
    },
    {
      contactName: "",
      contactPhone: "",
      relationship: "Friend",
      nominee: false,
    },
    {
      contactName: "",
      contactPhone: "",
      relationship: "Friend",
      nominee: false,
    },
  ]);
  const { toast } = useToast();

  const profileId = useRecoilValue(profileIdAtom);
  const gender = useRecoilValue(genderAtom);
  const accessToken = sessionStorage.getItem("accessToken");

  const updateEmergencyContact = (field, value, index) => {
    const newContacts = [...emergencyContacts];
    newContacts[index][field] = value;
    setEmergencyContacts(newContacts);
  };

  const handleNomineeChange = (index) => {
    const newContacts = emergencyContacts.map((contact, i) => ({
      ...contact,
      nominee: i === index,
    }));
    setEmergencyContacts(newContacts);
  };

  const emergencyDetails = {
    profile: profileId,
    family_name1: emergencyContacts[0].contactName,
    family_name2: emergencyContacts[1].contactName,
    friend_name1: emergencyContacts[2].contactName,
    friend_name2: emergencyContacts[3].contactName,
    family_phone1: emergencyContacts[0].contactPhone,
    family_phone2: emergencyContacts[1].contactPhone,
    friend_phone1: emergencyContacts[2].contactPhone,
    friend_phone2: emergencyContacts[3].contactPhone,
    family_rel1: emergencyContacts[0].relationship,
    family_rel2: emergencyContacts[1].relationship,
    friend_rel1: emergencyContacts[2].relationship,
    friend_rel2: emergencyContacts[3].relationship,
    nominee: emergencyContacts.find((contact) => contact.nominee)?.contactName,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regex pattern for phone number validation
    const phonePattern = /^\d{10}$/;

    // Validate phone numbers
    for (const contact of emergencyContacts) {
      if (!phonePattern.test(contact.contactPhone)) {
        toast({
          title: "Error",
          description:
            "Please enter valid 10-digit phone numbers for all contacts.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const response = await axios.post(
        `${baseUrl}/profile/create_emergency`,
        emergencyDetails,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status < 200 || response.status >= 300) {
        return;
      }
      onStepChange(5);
      toast({
        title: "Success",
        description: "Emergency contacts submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getPronoun = () => (gender === "Male" ? "his" : "her");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
        Emergency Contact Information
      </h2>
      <Separator className="bg-sky-200 dark:bg-sky-700" />
      <div className="space-y-4">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
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
                You are {getPronoun()}:
              </Label>
              {contact.relationship === "Family" ? (
                <Select
                  onValueChange={(value) =>
                    updateEmergencyContact("relationship", value, index)
                  }
                >
                  <SelectTrigger className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Sister">Sister</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Relative">Relative</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={`relationship-${index}`}
                  value={contact.relationship}
                  onChange={(e) =>
                    updateEmergencyContact(
                      "relationship",
                      e.target.value,
                      index
                    )
                  }
                  className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
                  required
                />
              )}
            </div>
            <div className="space-y-2 flex items-center justify-center">
              <Label
                htmlFor={`nominee-${index}`}
                className="text-sky-700 dark:text-sky-300"
              >
                Nominee
              </Label>
              <input
                type="checkbox"
                id={`nominee-${index}`}
                checked={contact.nominee}
                onChange={() => handleNomineeChange(index)}
                className="form-checkbox h-5 w-5 text-sky-600"
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