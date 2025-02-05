import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDashboardDataAtom } from "../store/UserAtoms";
import axios from "axios";
import GridPattern from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function EmergencyContactsUpdate() {
  const baseUrl = "http://3.108.8.215/api/v1";
  const userData = useRecoilValue(userDashboardDataAtom);
  const accessToken = sessionStorage.getItem("accessToken");
  const setUserDashboardData = useSetRecoilState(userDashboardDataAtom);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      contactName: userData.emergency_contact[0]?.family_name1 || "",
      contactPhone: userData.emergency_contact[0]?.family_phone1 || "",
      relationship: userData.emergency_contact[0]?.family_rel1 || "Family",
      nominee: userData.emergency_contact[0]?.nominee === userData.emergency_contact[0]?.family_name1 || false,
    },
    {
      contactName: userData.emergency_contact[0]?.family_name2 || "",
      contactPhone: userData.emergency_contact[0]?.family_phone2 || "",
      relationship: userData.emergency_contact[0]?.family_rel2 || "Family",
      nominee: userData.emergency_contact[0]?.nominee === userData.emergency_contact[0]?.family_name2 || false,
    },
    {
      contactName: userData.emergency_contact[0]?.friend_name1 || "",
      contactPhone: userData.emergency_contact[0]?.friend_phone1 || "",
      relationship: userData.emergency_contact[0]?.friend_rel1 || "Friend",
      nominee: userData.emergency_contact[0]?.nominee === userData.emergency_contact[0]?.friend_name1 || false,
    },
    {
      contactName: userData.emergency_contact[0]?.friend_name2 || "",
      contactPhone: userData.emergency_contact[0]?.friend_phone2 || "",
      relationship: userData.emergency_contact[0]?.friend_rel2 || "Friend",
      nominee: userData.emergency_contact[0]?.nominee === userData.emergency_contact[0]?.friend_name2 || false,
    },
  ]);

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

    const emergencyDetails = {
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

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.put(
        `${baseUrl}/profile/update_emergency/${userData.id}`,
        emergencyDetails,
        { headers }
      );

      if (response.status < 200 || response.status >= 300) {
        return;
      }

      setUserDashboardData((prevData) => ({
        ...prevData,
        emergency_contact: [response.data],
      }));
      navigate('/user-dashboard', { replace: true });
      toast({
        title: "Success",
        description: "Emergency contacts updated successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
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
                Update Emergency Contacts
              </h2>
              <Separator className="bg-sky-200 dark:bg-sky-700" />
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex flex-wrap gap-4">
                    <div className="space-y-2 flex-1 min-w-[200px]">
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
                    <div className="space-y-2 flex-1 min-w-[200px]">
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
                    <div className="space-y-2 flex-1 min-w-[200px]">
                      <Label
                        htmlFor={`relationship-${index}`}
                        className="text-sky-700 dark:text-sky-300"
                      >
                        Relationship
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          updateEmergencyContact("relationship", value, index)
                        }
                        value={contact.relationship}
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
                          <SelectItem value="Friend">Friend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 flex items-center justify-center flex-1 min-w-[200px]">
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
                Update
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}