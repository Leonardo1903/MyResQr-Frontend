import { useState, useRef } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenAtom, profileIdAtom } from "../store/UserAtoms";

export default function PinActivationStep() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const toast = useToast();
  const [isActivated, setIsActivated] = useState(false);
  const [activationKey, setActivationKey] = useState("");
  const [otp, setOtp] = useState(Array(8).fill(""));
  const inputRefs = useRef([]);

  const accessToken = useRecoilValue(accessTokenAtom);
  const profileId = useRecoilValue(profileIdAtom);

  const handleActivate = () => {
    setIsActivated(true);
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Update formData.pin
      setOtp((prev) => ({
        ...prev,
        pin: newOtp.join(""),
      }));

      // Move to the next input field if the current one is filled
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key down event
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Api call to activate pin
  const activatePin = async (pin, activationKey, profileId) => {
    const response = await axios.post(
      `${baseUrl}/pin_manager/activate_pin`,
      { pin, key: activationKey, profile_id: profileId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data.message || "Error activating PIN");
    }
  };

  // Api call to verify pin
  const verifyPin = async (pin, activationKey) => {
    const response = await axios.post(
      `${baseUrl}/pin_manager/activate_pin`,
      { pin, key: activationKey },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data.message || "Error verifying PIN");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pin = otp.join("");
    try {
      const pinResponse = await verifyPin(pin, activationKey);
      if (pinResponse.data.data.message === "Pin Number is already activated") {
        toast({
          title: "Error",
          description: "Pin Number is already activated",
        });
        navigate("/user-dashboard");
        return;
      } else if (
        pinResponse.data.data.message === "Pin Number is not activated"
      ) {
        try {
          const response = await activatePin(pin, activationKey, profileId);
          if (response.data.data.message === "Pin Activated") {
            toast({ title: "Success", description: "Pin Activated" });
            navigate("/user-dashboard");
            return;
          }
        } catch (error) {
          toast({
            title: "Error",
            description: `Error activating PIN: ${error.message}`,
          });
          return;
        }
      }
      toast({
        title: "Success",
        description: "Your signup form has been submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Error verifying PIN: ${error.message}`,
      });
    }
  };

  return (
    <div className="space-y-4">
      {!isActivated ? (
        <div>
          <Button
            type="button"
            className="mt-4 justify-center bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
            onClick={handleActivate}
          >
            Activate PIN
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200">
            PIN Activation
          </h2>
          <Separator className="bg-sky-200 dark:bg-sky-700" />
          <div className="space-y-2">
            <Label htmlFor="pin" className="text-sky-700 dark:text-sky-300">
              8-Digit PIN
            </Label>
            <div className="flex space-x-2 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index + 1}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100"
                  maxLength={1}
                  required
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="activationKey"
              className="text-sky-700 dark:text-sky-300"
            >
              Activation Key
            </Label>
            <Input
              id="activationKey"
              type="text"
              value={activationKey}
              onChange={(e) => setActivationKey(e.target.value)}
              className="w-full text-center text-2xl bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100"
              required
            />
          </div>
          <Button
            type="submit"
            className="mt-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
