import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from "./theme-provider";
import logoDark from "../assets/Logo-Dark.png";
import logoLight from "../assets/Logo-Light.png";


export default function Component() {
  const { theme } = useTheme();
  const footerLinks = {
    company: [
      { label: "About Us", href: "#" },
      { label: "Home", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    product: [
      { label: "Blogs", href: "#" },
      { label: "Business Services", href: "#" },
      { label: "myresQR", href: "#" },
    ],
    support: [
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-sky-200 dark:bg-gray-900 py-16 transition-colors duration-200">
      <div className="container mx-auto px-4 md:max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Company</h2>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Product</h2>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Support</h2>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo and Description */}
          <div className="space-y-4">
            {theme === "dark" ? (
              <img
              src={logoDark}
              alt="myresQR"
              width={200}
              height={50}
              className="mb-4 "
            />
            ) : (
              <img
              src={logoLight}
              alt="myresQR"
              width={200}
              height={50}
              className="mb-4 "
            />
            )}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Equip yourself with a Quick Response system which will bring help to you in cases of emergencies before a spectator crowd gathers around you, at merely a scan of your QR code..
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500 dark:hover:border-sky-400 transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Kuberakshi Business Solutions Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  )
}