import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";



const steps = [
  {
    title: "Planning & Preparation",
    desc: "A well-structured hackathon begins with defining its theme, format, and goals. Organizers secure sponsorships, recruit judges and mentors, and set up tools for seamless execution.",
    img: assets.planning1,
  },
  {
    title: "Registration & Team Formation",
    desc: "Participants sign up through online forms or platforms, forming teams based on skills or project ideas. Organizers provide resources, set up communication channels, and facilitate networking.",
    img: assets.register,
  },
  {
    title: "Development & Collaboration",
    desc: "Teams start coding and developing their ideas using provided tools, APIs, and mentorship support. Collaboration happens through platforms like GitHub, Slack, or Discord.",
    img: assets.development1,
  },
  {
    title: "Submission & Evaluation",
    desc: "Participants submit their projects, including code, documentation, and demos, through designated platforms. Judges evaluate submissions based on innovation, feasibility, and execution.",
    img: assets.submission1,
  },
  {
    title: "Winner Announcement & Closing Ceremony",
    desc: "Final scores determine the winning teams, who are recognized with prizes, certificates, or internships. Organizers host a closing ceremony to celebrate participants, sponsors, and mentors.",
    img: assets.winner,
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-black bg-white">
      <div className="bg-[#F6E8C5] text-black py-20 px-8 md:px-16 flex flex-col md:flex-row items-center">
        <div className="space-y-6 md:w-1/2">
          <h1 className="text-6xl font-extrabold leading-tight tracking-widest">
            Empower, Innovation,
            <br />
            Build The Future.
          </h1>
          <p className="text-lg text-gray-700">
            Join the HackFusion Hackathon and challenge yourself to think beyond
            limits. Collaborate with like-minded innovators, build groundbreaking
            solutions, and showcase your talent on a global stage.
            <br />
            <span className="font-bold text-sky-600">
              This is your chance to learn, grow, and make an impact
              <br />- because the best ideas start with you!
            </span>
          </p>
        </div>

        <div className="flex justify-center w-full md:w-1/2">
          <img
            src={assets.main}
            alt="Main"
            className="object-contain w-auto h-auto mix-blend-multiply"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="px-8 py-16 md:px-16">
        <h2 className="mb-10 text-4xl font-bold text-center text-blue-700">
          Explore Our Hackathons
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.slice(0, 3).map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-lg"
            >
              <img
                src={step.img}
                alt={step.title}
                className="w-24 h-24 mb-4 rounded-full"
              />
              <h3 className="mb-2 text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-center text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
        <button
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    navigate("/hackathons"); // Navigate to the page
  }}
  className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
>
  View More
</button>

        </div>
      </div>

      <div className="py-20 text-center">
        <h1 className="font-bold tracking-wide text-blue-700 text-7xl">
          Process of Hackathon
        </h1>
      </div>

      {steps.map((step, index) => (
        <section
          key={index}
          className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-12 py-7 bg-white ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="flex justify-center w-full md:w-1/2">
            <img
              src={step.img}
              alt={step.title}
              className="w-full max-w-md rounded-lg"
            />
          </div>

          <div
            className={`w-full md:w-1/2 ${
              index % 2 === 0 ? "pl-12" : "pr-6"
            }`}
          >
            <h2 className="text-6xl font-semibold text-blue-600">{step.title}</h2>
            <p className="mt-6 text-xl text-gray-700">{step.desc}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
