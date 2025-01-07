import { useState, useRef } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenAtom, profileIdAtom, roleAtom } from "../store/UserAtoms";

export default function PinActivationStep() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activationKey, setActivationKey] = useState("");
  const [otp, setOtp] = useState(Array(8).fill(""));
  const inputRefs = useRef([]);

  const accessToken = useRecoilValue(accessTokenAtom);
  const profileId = useRecoilValue(profileIdAtom);
  const role = useRecoilValue(roleAtom);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pin = otp.join("");
      const pinResponse = await axios.post(
        `${baseUrl}/pin_manager/verify_pin`,
        {
          pin,
          activation_key: activationKey,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (pinResponse.data.message === "Pin Number is not activated") {
        try {
          const pinActivationResponse = await axios.post(
            `${baseUrl}/pin_manager/activate_pin`,
            {
              pin,
              key: activationKey,
              profile_id: profileId,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (
            pinActivationResponse.data.message === "Pin activated successfully."
          ) {
            toast({
              title: "Success",
              description: "PIN Activated",
            });

            if (role === "agent") {
              navigate("/agent-dashboard");
              return;
            }
            navigate("/login");
          }
        } catch (error) {
        }
      } else {
        toast({
          title: "Pin already activated",
        });
        navigate("/user-dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Incorrect Pin: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
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
                className="w-9 h-9 md:w-14 md:h-14 text-center
                text-xl md:text-2xl bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100"
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
          onClick={handleSubmit}
          className="mt-4 bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
