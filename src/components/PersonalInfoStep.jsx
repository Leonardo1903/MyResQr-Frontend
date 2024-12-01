import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenAtom, idAtom, profileIdAtom } from "../store/UserAtoms";
import axios from "axios";

export default function PersonalInfoStep({ onStepChange }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isWhatsAppSame, setIsWhatsAppSame] = useState(true);
  const { toast } = useToast();
  const userId = useRecoilValue(idAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  const setProfileId = useSetRecoilState(profileIdAtom);

  // const personalDetails = {
  //   account: userId,
  //   mobile_number: mobileNumber,
  //   first_name: firstName,
  //   last_name: lastName,
  //   email_id: email,
  //   whatsapp_number: whatsappNumber,
  //   dob: dateOfBirth,
  //   gender: gender,
  //   address: address,
  //   city: city,
  //   state: state,
  //   pin_code: pincode,
  //   country: country,
  // };

  // const formData = new FormData();
  // formData.append("first_name", firstName);
  // formData.append("last_name", lastName);
  // formData.append("email_id", email);
  // formData.append("mobile_number", mobileNumber);
  // formData.append("whatsapp_number", whatsappNumber);
  // formData.append("dob", dateOfBirth);
  // formData.append("gender", gender);
  // formData.append("address", address);
  // formData.append("city", city);
  // formData.append("state", state);
  // formData.append("pin_code", pincode);
  // formData.append("country", country);

  // if (avatar) {
  //   formData.append("avatar", avatar);
  // }

  const handleWhatsAppCheckboxChange = (checked) => {
    setIsWhatsAppSame(checked);
    if (checked) {
      setWhatsappNumber(mobileNumber);
    } else {
      setWhatsappNumber("");
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    document.getElementById("avatar").value = null;
  };

  const fetchLocationData = async (pincode) => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setCity(postOffice.Region);
        setState(postOffice.State);
        setCountry(postOffice.Country);
      } else {
        toast({
          title: "Error",
          description: "Unable to fetch location data for the given pincode.",
        });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching location data.",
      });
    }
  };

  const handlePincodeChange = (e) => {
    const pincode = e.target.value;
    setPincode(pincode);
    if (pincode.length === 6) {
      fetchLocationData(pincode);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("account", userId);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email_id", email);
    formData.append("mobile_number", mobileNumber);
    formData.append("whatsapp_number", whatsappNumber);
    formData.append("dob", dateOfBirth);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pin_code", pincode);
    formData.append("country", country);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    };

    // Log headers for debugging
    console.log("Headers:", headers);

    try {
      const response = await axios.post(
        `${baseUrl}/profile/create_profile`,
        formData,
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

      setProfileId(response.data.id);
      onStepChange(2);
      toast({
        title: "Success",
        description: "Personal details submitted successfully.",
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="mobileNumber"
            className="text-sky-700 dark:text-sky-300"
          >
            Mobile Number
          </Label>
          <Input
            id="mobileNumber"
            type="tel"
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
              if (isWhatsAppSame) {
                setWhatsappNumber(e.target.value);
              }
            }}
            className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
            required
          />
        </div>
      </div>
      <div className="space-y-2 flex items-center">
        <Checkbox
          id="isWhatsAppSame"
          checked={isWhatsAppSame}
          onCheckedChange={handleWhatsAppCheckboxChange}
        />
        <Label
          htmlFor="isWhatsAppSame"
          className="text-sky-700 dark:text-sky-300 ml-2"
        >
          Is this your WhatsApp number?
        </Label>
      </div>
      {!isWhatsAppSame && (
        <div className="space-y-2">
          <Label
            htmlFor="whatsappNumber"
            className="text-sky-700 dark:text-sky-300"
          >
            WhatsApp Number
          </Label>
          <Input
            id="whatsappNumber"
            type="tel"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
            required
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sky-700 dark:text-sky-300">
            Gender
          </Label>
          <Select onValueChange={(value) => setGender(value)}>
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
          <Label
            htmlFor="dateOfBirth"
            className="text-sky-700 dark:text-sky-300"
          >
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar" className="text-sky-700 dark:text-sky-300">
            Upload Avatar
          </Label>
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              onClick={() => document.getElementById("avatar").click()}
              className="bg-sky-600 hover:bg-sky-800 text-white px-2 rounded-md"
            >
              Choose File
            </Button>
          </div>
          <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-300 mt-2">
            <span>{avatar ? avatar.name : "No file chosen"}</span>
            {avatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Input
            id="avatar"
            type="file"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sky-700 dark:text-sky-300">
          Address
        </Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
          required
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pincode" className="text-sky-700 dark:text-sky-300">
            Pincode
          </Label>
          <Input
            id="pincode"
            value={pincode}
            onChange={handlePincodeChange}
            className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sky-700 dark:text-sky-300">
            City
          </Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            value={state}
            onChange={(e) => setState(e.target.value)}
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600"
            required
          />
        </div>
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
