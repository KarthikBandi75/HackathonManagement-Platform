import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-gray-700 bg-gray-100">
      <div className="container grid grid-cols-1 gap-6 px-6 py-10 mx-auto sm:grid-cols-2 md:grid-cols-4">
        
        {/* Logo & Description */}
        <div className="text-sm leading-6">
          <p className="md:w-4/5">
            HackFusion is your trusted platform for managing all hackathons, providing seamless and efficient user access.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:text-blue-500">Home</li>
            <li className="cursor-pointer hover:text-blue-500">About Us</li>
            <li className="cursor-pointer hover:text-blue-500">Contact Us</li>
            <li className="cursor-pointer hover:text-blue-500">Privacy Policy</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Get in Touch</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">📞 <span>+91 8639141744</span></li>
            <li className="flex items-center gap-2">📧 <span>karthikbandi719@gmail.com</span></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="flex items-center justify-center w-8 h-8 text-white transition bg-blue-600 rounded-full hover:bg-blue-700">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="flex items-center justify-center w-8 h-8 text-white transition bg-blue-400 rounded-full hover:bg-blue-500">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="flex items-center justify-center w-8 h-8 text-white transition bg-blue-800 rounded-full hover:bg-blue-900">
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" className="flex items-center justify-center w-8 h-8 text-white transition bg-pink-600 rounded-full hover:bg-pink-700">
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="py-4 text-xs text-center border-t border-gray-300">
        <p>© 2024 HackFusion. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
