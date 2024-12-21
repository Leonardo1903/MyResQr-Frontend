import hero1 from '../assets/hero-1.png'
import { CircleArrowRight, Cpu, HandHeart, Mails, ScanSearch } from 'lucide-react'
import { Spotlight } from '../components/ui/Spotlight'
import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import StylishSeparator from '../components/stylishSeparator'

function Home() {
  const aboutUsData = [
    {
      index : 1,
      title: 'A unique QR Code based Emergency ID system',
      icon : <ScanSearch className='h-14 w-14 text-sky-600' />
    }, {
      index : 2,
      title : 'Helps leverage the tremendous power of People and technology to provide Help and Information',
      icon : <Cpu className='h-14 w-14 text-sky-600'/>
    }, {
      index : 3,
      title : 'Enables the probability of saving life’s through first responders',
      icon : <HandHeart className='h-14 w-14 text-sky-600' />
    } 
  ]

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  const steps = [
    {
      title: "Sign Up",
      description: "Create an account on our platform by providing your basic information.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      )
    },
    {
      title: "Set Up Your Profile",
      description: "Complete your profile with medical information and emergency contacts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Get Your QR Code",
      description: "Receive a unique QR code that contains your emergency information.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
        </svg>
      )
    },
    {
      title: "Display Your QR Code",
      description: "Place your QR code on personal items like phone cases, wallets, or wearables.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      )
    },
    {
      title: "In Case of Emergency",
      description: "First responders can scan your QR code to access your critical information quickly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    }
  ]

  return (
    <div className='max-w-7xl mx-auto h-fit antialiased'>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#27a9e1"
      />
      
      {/* Landing section */}
      <section className='w-full h-screen flex flex-col md:flex-row justify-center items-center'>
        <div className='w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-baseline md:space-y-10 '>
          <h1 className=' text-4xl md:text-6xl'>Empower Yourself with <br /> <span className='text-sky-600 font-bold'>myresQR.life</span> </h1>

          <button className='bg-sky-600 hover:bg-sky-700 hover:scale-110 transition-all ease-in-out duration-300 text-white font-bold py-2 px-4 rounded mt-4 flex items-center shadow-xl'>
            Try now <CircleArrowRight className='ml-4' />
          </button>
        </div>
        <div className='w-full md:w-1/2 h-full flex flex-col justify-center items-center'>
          <img src={hero1} alt="Image-1" className='' />
        </div>
      </section>

      <StylishSeparator />

      {/* How MyResQR works section */}
      <section className="py-16 bg-gradient-to-br ">
      <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-6xl font-bold text-center text-black dark:text-white mb-12">How to Use <span className='text-sky-600 font-bold'>myresQR</span> </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-black dark:bg-white"></div>
          
          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-1/2"></div>
                <div className="w-10 h-10 absolute left-1/2 transform -translate-x-1/2 -translate-y-4 rounded-full  bg-black dark:bg-white  border-4 border-sky-500 z-10 flex items-center justify-center">
                  {step.icon}
                </div>
                <Card className={`w-1/2 border-sky-500 border-2 bg-sky-500/20 dark:bg-sky-500/20 ${index % 2 === 0 ? 'mr-8' : 'ml-8'} `}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 ">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <StylishSeparator />

      {/* About MyResQR section */}
      <section className='w-full h-fit'>
        <h1 className='text-3xl md:text-5xl'>About <span className='text-sky-600 font-bold'>MyResQR</span> </h1>
        <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 my-10 h-full'>
          {
            aboutUsData.map((data, index) => (
              <div key={index} className='w-full md:w-1/3  h-[10rem] md:h-[14rem] flex flex-col justify-center items-center md:items-baseline md:space-y-10 border-black dark:border-white border-2 px-4 py-6 rounded-2xl dark:hover:border-sky-600 hover:border-sky-600 hover:scale-105 transition-all ease-in-out duration-300'>
            <div className='text-4xl h-fit w-full text-sky-600 flex justify-center items-center'>
              {data.icon}
            </div>
            <h1 className='text-2xl'>{data.title}</h1>
          </div>
            ))
          }
        </div>
      </section>
      <StylishSeparator />

      {/* Contact us section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4 md:p-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Contact Form */}
        
        <div className="w-full md:w-1/2 backdrop-blur-lg rounded-xl p-8 shadow-xl bg-sky-100 bg-opacity-30 dark:bg-sky-800 dark:bg-opacity-30 border border-sky-800 dark:border-sky-700">
        
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/20 dark:bg-gray-700/20 text-white placeholder-gray-300 border-gray-300 dark:border-gray-600"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="contactNumber" className="text-white">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="bg-white/20 dark:bg-gray-700/20 text-white placeholder-gray-300 border-gray-300 dark:border-gray-600"
                placeholder="Your Contact Number"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/20 dark:bg-gray-700/20 text-white placeholder-gray-300 border-gray-300 dark:border-gray-600"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-white">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-white/20 dark:bg-gray-700/20 text-white placeholder-gray-300 border-gray-300 dark:border-gray-600"
                placeholder="Your message here..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white">
              Send Message
            </Button>
          </form>
        </div>

        {/* Simple Envelope SVG */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Mails className="w-2/4 h-2/4 text-sky-600" />
        </div>
      </div>
    </section>
    </div>
  )
}

export default Home