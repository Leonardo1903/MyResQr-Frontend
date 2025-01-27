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
import { Link, replace, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenAtom, profileIdAtom } from "../store/UserAtoms";

function Login() {
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState("");
  const baseUrl = "http://3.108.8.215/api/v1";
  const accessToken = sessionStorage.getItem("accessToken");
  const setProfileId = useSetRecoilState(profileIdAtom);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUserPhoneNumber === "") {
      toast({
        title: "Required",
        description: "Please enter a phone number.",
        variant: "destructive",
      });
      return;
    }
    //console.log("Access Token:", accessToken);
    try {
      const response = await axios.post(
        `${baseUrl}/account/agent/create_user`,
        {
          phone_number: newUserPhoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newUserId = response.data.user.id;
      setProfileId(newUserId);

      navigate("/signup", { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create user. Please try again.";
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
                Welcome Agent!
              </h2>
              <p className="text-sky-700 dark:text-sky-300">
                Make user&apos;s life easy
              </p>
            </div>

            {/* Right side with login form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h3 className="text-3xl font-semibold text-sky-800 dark:text-sky-100 mb-8">
                Create New User
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
                        placeholder="Enter user's phone number"
                        value={newUserPhoneNumber}
                        onChange={(e) => setNewUserPhoneNumber(e.target.value)}
                        className="pl-10 bg-white bg-opacity-50 dark:bg-sky-800 dark:bg-opacity-50 border-sky-300 dark:border-sky-600 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500 dark:focus:ring-sky-400 text-sky-800 dark:text-sky-100 placeholder-sky-500 dark:placeholder-sky-400"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Create User
                  </Button>
                </div>
              </form>

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
