import GridPattern from "../components/ui/grid-pattern";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { PhoneIcon } from "lucide-react";
import Lottie from "react-lottie";
import LoginData from "../assets/LoginAnimation.json";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {  phoneNumberAtom, trace_idAtom } from "../store/UserAtoms";

function Login() {
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberAtom);
  const setTraceId = useSetRecoilState(trace_idAtom);
  // const baseUrl = import.meta.env.VITE_BASE_URL 
  const baseUrl = 'http://3.108.8.215/api/v1'

  const {toast} = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber === "") {
      toast({
        title: "REQUIRED",
        description: "Please enter a phone number.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/account/get_otp`, {
        phone_number: phoneNumber,
      });
        const traceId = response.data.data.trace_id;
        setTraceId(traceId);

        
        // navigate("/signup", { replace: true });
        // toast({
        //   title: "Sign Up Required",
        //   description: "You are a new User, please sign up.",
        // })
        navigate("/enter-otp", { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message;
    }
  };


  const LoginAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="z-10 absolute inset-0 w-full h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl bg-sky-100 bg-opacity-30 dark:bg-sky-800 dark:bg-opacity-30 backdrop-blur-md border border-sky-200 dark:border-sky-700">
          <div className="flex flex-col md:flex-row">
            {/* Left side with logo and tagline */}
            <div className="hidden md:flex md:w-1/2 bg-sky-200 bg-opacity-30 dark:bg-sky-900 dark:bg-opacity-30 p-12 flex-col justify-center items-center text-center">
              <div className="w-32 h-32 mb-8">
                <Lottie options={LoginAnimationOptions} />
              </div>
              <h2 className="text-3xl font-bold text-sky-800 dark:text-sky-100 mb-4">
                Welcome Back!
              </h2>
              <p className="text-sky-700 dark:text-sky-300">
                Login to access your account and stay connected.
              </p>
            </div>

            {/* Right side with login form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h3 className="text-3xl font-semibold text-sky-800 dark:text-sky-100 mb-8">
                Login
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sky-700 dark:text-sky-300"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <PhoneIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 dark:text-sky-400"
                        size={20}
                      />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10 bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100 placeholder-sky-500 dark:placeholder-sky-400"
                        
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Get OTP
                  </Button>
                </div>
              </form>
              {/* <div className="mt-6 text-center">
                <p className="text-sky-700 dark:text-sky-300 mb-2">New user?</p>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="w-full border-sky-500 dark:border-sky-400 text-sky-600 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-800 font-semibold py-3 rounded-lg transition duration-300 ease-in-out"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div> */}
              <p className="mt-6 text-center text-sky-600 dark:text-sky-400 text-sm">
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
