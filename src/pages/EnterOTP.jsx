'use client'
import { useState, useRef, useEffect } from 'react'
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { ArrowLeftIcon, LockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import GridPattern from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import axios, { AxiosError } from 'axios'
import { useToast } from '../hooks/use-toast';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { accessTokenAtom, emailAtom, idAtom, phoneNumberAtom, refresh_tokenAtom } from '../store/UserAtoms';

export default function Component() {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const navigate = useNavigate();
  const [timeleft, setTimeleft] = useState(60); // 60 seconds
  const [isResendingDisabled, setIsResendingDisabled] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL 
  const {toast} = useToast();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useRecoilState(refresh_tokenAtom);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberAtom)
  const [id, setId] = useRecoilState(idAtom);
  const [ email, setEmail] = useRecoilState(emailAtom);


  useEffect(() => {
    if (timeleft > 0) {
      const timer = setInterval(() => {
        setTimeleft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    } else {
        setIsResendingDisabled(false);
    }
  }, [timeleft]); // It will also depend on the backend logic

    const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input if value is entered
      if (value !== '' && index < 3) {
        inputRefs[index + 1].current.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const enteredOtp = otp.join('')
    console.log(phoneNumber, enteredOtp);
    if (enteredOtp.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP.",
        variant: "destructive",
      });
      return
    }
    try {
      const response = await axios.post(`${baseUrl}/account/validate_otp`, {
        phone_number : phoneNumber,
        otp : enteredOtp
      } )

      //checking role
      if (response.data.role === "agent") {
      navigate('/agent-dashboard', {replace: true});
      setAccessToken(response.data.data.accessToken);
      setRefreshToken(response.data.data.refresh_token);
      // TODO : store other state if agent has more information
      toast({
        title : "Successfully signed in",
        description : "You are now signed in as an agent",
        variant : "default"
      })
      return
    }

    //checking status of the user
    if (response.data.status !== "existing") {
      navigate('/signup', {replace: true});
      toast({
        title : "Signup required",
        descritption : response.data.message || "You are not an existing user, please sign up first",
        variant : "destructive"
      })
      return
    }

    //updating the state
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refresh_token);
    setId(response.data.user.id);
    setPhoneNumber(response.data.user.phone_number);
    setEmail(response.data.user.email);
    
    // console.log("Access token : ", accessToken);
    // console.log("Refresh token : ", refreshToken);
    // console.log("ID : ", id);
    // console.log("Phone number : ", phoneNumber);
    // console.log("Email : ", email);
    
    //calling getProfile route
    try {
      const res = await axios.get(`${baseUrl}/profile/get_profile/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
      }})
      //TODO : handling the response (will do when backend is fixed )
      useNavigate('/user-dashboard', {replace: true});
      toast({
        title : "Success",
        description : response.data.message,
        variant : "default"
      })
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }    

    } catch (error) {
      const errorMessage = error.response?.data?.message; 
      console.log("Error message : ", error);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
    // console.log('Submitted OTP:', enteredOtp)
  }

  const handleResendOTP = async () => {
    // Handle resend OTP logic here
    try {
      const response = await axios.post(`${baseUrl}/account/get_otp`, {
        phone_number: phoneNumber,
      });
      toast({
        title : "Success",
        description : response.data.message || "OTP resent successfully",
        variant : "default"
      })
      setIsResendingDisabled(true);
      setTimeleft(60);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast ({
        title : "Error",
        description : errorMessage,
        variant : "destructive"
      })
    }
  }

  const goToPreviousWindow = () => {
    navigate("/login", {replace: true});
  }

  useEffect(() => {
    inputRefs[0].current.focus()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
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
      <Card className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl bg-sky-100 bg-opacity-30 dark:bg-sky-800 dark:bg-opacity-30 backdrop-blur-md border border-sky-200 dark:border-sky-700">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Button onClick={goToPreviousWindow} variant="ghost" className="p-0 mr-4 text-sky-700 dark:text-sky-300 hover:bg-transparent">
              <ArrowLeftIcon size={24} />
            </Button>
            <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-100">Enter OTP</h2>
          </div>
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-sky-200 dark:bg-sky-700 rounded-full">
              <LockIcon size={40} className="text-sky-600 dark:text-sky-300" />
            </div>
            <p className="text-sky-700 dark:text-sky-300">We've sent a code to your phone</p>
            <p className="text-sky-600 dark:text-sky-400 font-semibold">{phoneNumber}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="otp-1" className="sr-only">OTP</Label>
                <div className="flex justify-between max-w-xs mx-auto">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index + 1}`}
                      ref={inputRefs[index]}
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
              <Button 
                type="submit" 
                className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                Verify OTP
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sky-700 dark:text-sky-300">Didn't receive the code?</p>
            <Button 
              variant="link" 
              className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200 font-semibold"
              disabled = {isResendingDisabled}
              onClick={handleResendOTP}
            >
              {isResendingDisabled ? `Resend otp in ${timeleft} seconds` : "Resend OTP"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}