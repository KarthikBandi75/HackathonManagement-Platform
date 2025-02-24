import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="w-full min-h-screen px-6 py-10 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        
        <h1 className="text-3xl font-bold text-teal-300">About Hack Fusion</h1>
        <p className="mt-4 text-lg text-gray-700">
          Hack Fusion is a comprehensive hackathon management platform designed to empower participants, organizers, and judges. Whether you're competing, managing an event, or evaluating projects, our platform provides all the essential tools to create a seamless and enriching hackathon experience.
        </p>
      </div>

      
      <div className="flex flex-col max-w-5xl gap-8 mx-auto mt-10 md:flex-row">
        
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-blue-500">For Participants</h2>
          <p className="mt-4 text-gray-700">
            Joining a hackathon has never been easier. Participants can register securely, create or join teams, and showcase their innovative projects. Our intuitive platform enables smooth collaboration, allowing teams to submit their work effortlessly while staying updated with real-time notifications. Whether you're a beginner or an experienced hacker, Hack Fusion ensures an inclusive and engaging competition.
          </p>
        </div>

        
        <div className="flex md:w-1/2">
          <img
            src={assets.About}
            alt="Hackathon Overview"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-green-500">For Organizers & Judges</h2>
        <p className="mt-4 text-gray-700">
          Managing a hackathon requires precision and efficiency. Hack Fusion simplifies this process by offering features to set deadlines, manage teams, and establish submission guidelines. Judges can review projects with ease, evaluate submissions based on set criteria, and provide valuable feedback to participants. Our platform streamlines the entire judging process, ensuring fairness and transparency.
        </p>
      </div>

      
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-semibold text-yellow-500">Why Choose Hack Fusion?</h2>
        <p className="mt-4 text-gray-700">
          Hack Fusion is built with a vision to enhance the hackathon ecosystem. Our user-friendly platform fosters innovation by offering a seamless experience from registration to project submission. With integrated communication tools and a robust project management system, we empower participants to collaborate effectively, while organizers can focus on curating an outstanding event.
        </p>
      </div>

      
      <div className="mt-12 text-center">
        <a
          href="/signup"
          className="px-6 py-3 text-lg font-semibold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Join Now & Start Hacking 🚀
        </a>
      </div>
    </div>
  );
};

export default About;
