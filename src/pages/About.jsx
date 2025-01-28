import { Spotlight } from "../components/ui/Spotlight";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import StylishSeparator from "../components/StylishSeparator";
import { Link } from "react-router-dom";
import {
  Users,
  Lightbulb,
  Heart,
  Clock,
  SmileIcon as Peace,
  Ambulance,
  MonitorIcon as Running,
  CreditCard,
  MessageSquare,
  FileText,
  Shield,
  Globe,
} from "lucide-react";

function AboutUs() {
  const whyMyResQRPoints = [
    {
      title: "myresQR Speaks",
      description:
        "myresQR speaks for you when you can't, providing vital information to first responders in an emergency",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: "Connect and Contact",
      description:
        "myresQR can connect and contact your loved ones in case of an emergency",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Medical Records",
      description:
        "myresQR enables hospital staff to locate vital medical records",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Medical Conditions",
      description:
        "myresQR can provide information about your medical conditions and allergies to first responders",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      title: "Golden Hour",
      description:
        "myresQR can prevent serious delays in treatment by saving crucial time during the 'golden hour' of medical treatment",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Peace of Mind",
      description:
        "myresQR gives you and your loved ones peace of mind knowing that help is just a scan away",
      icon: <Peace className="h-6 w-6" />,
    },
    {
      title: "Accident Support",
      description:
        "myresQR can provide accident support and emergency services in case of an accident",
      icon: <Ambulance className="h-6 w-6" />,
    },
    {
      title: "Athletic Lifestyle",
      description:
        "myresQR looks good on and makes a statement about your athletic lifestyle",
      icon: <Running className="h-6 w-6" />,
    },
    {
      title: "Cashless Treatment",
      description:
        "myresQR can provide cashless treatment in case of an emergency",
      icon: <CreditCard className="h-6 w-6" />,
    },
  ];

  const ourValues = [
    {
      title: "Safety First",
      description:
        "We prioritize the safety and well-being of our users above all else.",
      icon: <Shield className="h-10 w-10 text-sky-600" />,
    },
    {
      title: "Innovation",
      description:
        "We continuously strive to improve and innovate our technology to better serve our community.",
      icon: <Lightbulb className="h-10 w-10 text-sky-600" />,
    },
    {
      title: "Global Impact",
      description:
        "We aim to make a positive difference in emergency response and healthcare worldwide.",
      icon: <Globe className="h-10 w-10 text-sky-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto h-fit antialiased">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#27a9e1"
      />
      {/* About Us Hero Section */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl md:text-6xl mb-4">
          About <span className="text-sky-600 font-bold">myresQR.life</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl">
          We are on a mission to revolutionize personal safety and emergency
          response through innovative QR code technology. We are committed to
          empowering individuals and communities with the tools they need to
          stay safe, connected, and informed in critical moments. Our vision is
          to create a world where everyone has access to the resources and
          support they need to live life to the fullest, without fear or
          hesitation. Together, we can make a difference and build a safer, more
          resilient future for all.
        </p>
      </section>
      <StylishSeparator />

      {/* Why MyResQR Section */}
      <section className="w-full py-16">
        <h2 className="text-3xl md:text-5xl text-center mb-12">Why MyResQR?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyMyResQRPoints.map((point, index) => (
            <div key={index} className="relative transition-all duration-300">
              <Card className="w-full hover:scale-105 hover:shadow-lg hover:border-sky-600 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2 text-sky-600">
                    {point.icon}
                    <h3 className="font-semibold">{point.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <StylishSeparator />

      {/* Our Values Section */}
      <section className="w-full py-16">
        <h2 className="text-3xl md:text-5xl text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ourValues.map((value, index) => (
            <Card key={index} className="border-sky-500 border-2 bg-sky-500/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <StylishSeparator />

      {/* Call to Action Section */}
      <section className="w-full py-16 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl mb-6">
            Ready to Secure Your Safety?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of individuals who have already taken the first step
            towards a safer, more secure future with myresQR.life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Get MyResQID
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
