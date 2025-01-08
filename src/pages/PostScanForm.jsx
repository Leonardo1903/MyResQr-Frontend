import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { MapPin } from "lucide-react";
import { GridPattern } from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { postScanPinAtom, saviourDetailsAtom } from "../store/UserAtoms";
import { useSetRecoilState } from "recoil";
import axios from "axios";

export default function PostScanForm() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { toast } = useToast();
  const navigate = useNavigate();
  const { encrypted_pin } = useParams();
  const [isDoctor, setIsDoctor] = useState(null);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);
  const [pinNumber, setPinNumber] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [message, setMessage] = useState("");
  const [saviourInfo, setSaviourInfo] = useState({
    fullName: "",
    phoneNumber: "",
    workPlace: "",
  });

  const setPin = useSetRecoilState(postScanPinAtom);
  const setSaviourDetails = useSetRecoilState(saviourDetailsAtom);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, errors);
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
    decryptPin();
  }, []);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatitude(latitude.toFixed(6));
    setLongitude(longitude.toFixed(6));
    setMessage("Location Saved");
  }

  function errors(error) {
    toast({
      title: "Error",
      description: "Failed to get location. Please try again." + error.message,
      variant: "destructive",
    });
  }

  const decryptPin = async () => {
    if (encrypted_pin) {
      try {
        const response = await axios.get(
          `${baseUrl}/post_scan/scanqr/${encrypted_pin}`
        );
        setPinNumber(response.data.pin_number);
        setPin(response.data.pin_number);

        const pinResponse = await axios.get(
          `${baseUrl}/post_scan/pin/${pinNumber}`
        );

        if (pinResponse.data.profile === null) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast({
        title: "Error",
        description: "No encrypted pin found in URL.",
        variant: "destructive",
      });
    }
  };

  const saviourDetails = {
    saviour_name: saviourInfo.fullName,
    saviour_phone_number: saviourInfo.phoneNumber,
    is_doctor: isDoctor ? "True" : "False",
    pin_number: pinNumber,
    latitude: latitude,
    longitude: longitude,
    ...(isDoctor && { hospital_name: saviourInfo.workPlace }),
  };

  setSaviourDetails({
    fullName: saviourInfo.fullName,
    phoneNumber: saviourInfo.phoneNumber,
    pinNumber: pinNumber,
    latitude: latitude,
    longitude: longitude,
  });

  const handleRequestOtp = async () => {
    setOtpRequested(true);
    try {
      const response = await axios.post(`${baseUrl}/post_scan/otp_generation`, {
        saviour_phone_number: saviourInfo.phoneNumber,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpVerification = async () => {
    try {
      const otpInt = parseInt(otp.join(""), 10);
      const response = await axios.post(
        `${baseUrl}/post_scan/otp_verification`,
        {
          saviour_phone_number: saviourInfo.phoneNumber,
          otp: otpInt,
        }
      );
      toast({
        title: "Thank you for help, Saviour my Family has been informed",
        message: response.data.response,
      });
      navigate("/scan/dashboard");
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.post(`${baseUrl}/post_scan/saviour_info`, {
        ...saviourDetails,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="h-screen relative overflow-x-hidden">
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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 overflow-hidden"
        )}
      />
      <div className="max-w-md mx-auto space-y-4 mt-20 sm:mt-60">
        <Card className="bg-sky-100 bg-opacity-30 dark:bg-sky-600 dark:bg-opacity-30 backdrop-blur-md border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-yellow-400">
              Save a Life in 15 seconds
            </CardTitle>
            <p className="text-center text-yellow-400 mt-2">
              Thank you for helping!!!
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {isDoctor === null ? (
              <>
                <h2 className="text-xl font-bold text-center">
                  Are you a Doctor?
                </h2>
                <div className="flex justify-center space-x-4">
                  <Button
                    className="bg-green-500 hover:bg-green-600 px-8"
                    onClick={() => setIsDoctor(true)}
                  >
                    YES
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 px-8"
                    onClick={() => setIsDoctor(false)}
                  >
                    NO
                  </Button>
                </div>
              </>
            ) : !otpRequested ? (
              <>
                <h2 className="text-xl font-bold text-center">
                  Pin Number: {pinNumber}
                </h2>
                <h3 className="text-red-500 font-bold text-center">
                  Hello, Help!!!
                </h3>
                <p className="text-center text-sm">
                  Your details are required to inform my family that you are the
                  one who saved my life.
                </p>
                <Input
                  placeholder="Your Full name"
                  onChange={(e) =>
                    setSaviourInfo((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="bg-white/20 border-0 placeholder-white/50"
                />
                <Input
                  placeholder="Your phone number"
                  onChange={(e) => {
                    setSaviourInfo((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }));
                  }}
                  className="bg-white/20 border-0 placeholder-white/50"
                />
                {isDoctor && (
                  <Input
                    placeholder="Where you work"
                    onChange={(e) => {
                      setSaviourInfo((prev) => ({
                        ...prev,
                        workPlace: e.target.value,
                      }));
                    }}
                    className="bg-white/20 border-0 placeholder-white/50"
                  />
                )}
                <Button
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  onClick={handleRequestOtp}
                >
                  REQUEST OTP
                </Button>
              </>
            ) : (
              <>
                <div className="flex space-x-2 justify-center">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-9 h-9 md:w-14 md:h-14 text-center text-xl md:text-2xl bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100"
                      maxLength={1}
                      required
                    />
                  ))}
                </div>
                <Button
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  onClick={handleOtpVerification}
                >
                  SUBMIT OTP
                </Button>
              </>
            )}
            <Badge className="w-full justify-center" variant="secondary">
              <MapPin className="mr-2 h-4 w-4" />
              {message}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
