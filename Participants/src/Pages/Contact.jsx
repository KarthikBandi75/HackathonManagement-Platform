import React from "react";
import { Mail, Phone, MapPin } from "lucide-react"; // Import icons
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-10 text-gray-900 bg-white">
      <h1 className="text-4xl font-bold text-center text-blue-600">Contact Hack Fusion</h1>
      <p className="mt-2 text-lg text-center text-gray-700">
        Have questions? Need support? Reach out to us!
      </p>

      {/* Contact Section Layout */}
      <div className="grid items-center max-w-5xl gap-8 mt-10 md:grid-cols-2">
        
        {/* Left Side - Contact Image */}
        <div className="flex justify-center">
          <img
            src={assets.Contact}
            alt="Contact Us"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-yellow-500">Get in Touch</h2>
          <p className="mt-2 text-gray-700">
            Feel free to reach out to us anytime.
          </p>

          <div className="mt-4 space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-700"><strong>Email:</strong> support@hackfusion.com</span>
            </div>
            
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-green-500" />
              <span className="text-gray-700"><strong>Phone:</strong> +91 XXXXXXXXXX</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-red-500" />
              <span className="text-gray-700"><strong>Address:</strong> Sree Sai Nath Nagar, Tirupati, Chittoor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-semibold text-yellow-500">Meet Our Team</h2>
        <p className="mt-4 text-gray-700">
          Our dedicated team is here to help and support you throughout your hackathon journey.
        </p>
        <div className="grid gap-8 mt-6 md:grid-cols-2">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-500">ABC</h3>
            <p className="text-gray-600">Hackathon Coordinator</p>
            <p className="text-sm text-gray-500">📧 abc@example.com</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-500">XYZ</h3>
            <p className="text-gray-600">Technical Support</p>
            <p className="text-sm text-gray-500">📧 xyz@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
