import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus, FaBook, FaChartLine } from "react-icons/fa";

const assets = {
  courses: "courses-image-placeholder",
  assignment: "assignment-image-placeholder",
  codingTracks: "coding-tracks-image-placeholder",
  compiler: "compiler-image-placeholder",
  badges: "badges-image-placeholder",
  aiDebug: "ai-debug-image-placeholder",
  jobMatch: "job-match-image-placeholder",
  codeRoom: "code-room-image-placeholder",
  dashboardPreview: "dashboard-preview-image-placeholder",
  integrated: "integrated-image-placeholder",
};

const studentFeatures = [
  {
    title: "Access Courses & Materials",
    desc: "Dive into academic courses, download lecture notes, watch recorded sessions, and manage your schedule seamlessly.",
    img: assets.courses,
    category: "Academic Tools",
  },
  {
    title: "Assignments & Attendance",
    desc: "Submit assignments, track deadlines, and monitor attendance with real-time updates.",
    img: assets.assignment,
    category: "Academic Tools",
  },
  {
    title: "Enroll in Coding Tracks",
    desc: "Master DSA, Web Dev, Python, Java, and more with structured learning paths.",
    img: assets.codingTracks,
    category: "Coding Development",
  },
  {
    title: "Built-in Compiler",
    desc: "Code in real-time with a multi-language editor supporting C, C++, Python, and Java.",
    img: assets.compiler,
    category: "Coding Development",
  },
  {
    title: "Achievements & Heatmaps",
    desc: "Visualize your progress with skill heatmaps, badges, and weekly streaks.",
    img: assets.badges,
    category: "Coding Development",
  },
  {
    title: "AI Debug Assistant",
    desc: "Get instant AI-powered code debugging, logic hints, and quality feedback.",
    img: assets.aiDebug,
    category: "AI Features",
  },
  {
    title: "Job Match Recommender",
    desc: "Discover job opportunities tailored to your skills and portfolio.",
    img: assets.jobMatch,
    category: "AI Features",
  },
  {
    title: "Live Code Rooms",
    desc: "Collaborate with peers in real-time coding sessions and hackathons.",
    img: assets.codeRoom,
    category: "AI Features",
  },
];

const ConnectingThread = ({ direction }) => (
  <svg width="100%" height="50" viewBox="0 0 100 50" preserveAspectRatio="none">
    <path
      d={direction === "left-to-right" ? "M0 0 Q50 25 100 50" : "M100 0 Q50 25 0 50"}
      stroke="#D1D5DB"
      strokeWidth="2"
      strokeDasharray="5,5"
      fill="none"
    />
  </svg>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative px-8 py-24 overflow-hidden text-white bg-gradient-to-br from-blue-600 to-emerald-500"
      >
        <div className="relative z-10 mx-auto text-center max-w-7xl">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            Campus Bridge
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl mx-auto mt-4 text-lg md:text-2xl"
          >
            Your all-in-one platform to excel in academics, master coding, and kickstart your career.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="px-8 py-4 mt-8 font-semibold text-indigo-700 transition bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            Get Started
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-4xl font-bold text-center text-indigo-600 md:text-5xl">
            Discover Your Tools
          </h2>
          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
            {studentFeatures.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 text-center bg-white rounded-lg shadow-md"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="object-contain w-24 h-24 mx-auto mb-4"
                />
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          <h2 className="mb-16 text-4xl font-bold text-center text-indigo-600 md:text-5xl">
            Everything You Need to Succeed
          </h2>
          {studentFeatures.map((feature, index) => (
            <React.Fragment key={index}>
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex justify-center w-full md:w-1/2">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="object-contain w-full h-auto max-w-md rounded-lg"
                  />
                </div>
                <div className="w-full text-center md:w-1/2 md:text-left">
                  <h3 className="mb-4 text-3xl font-bold text-indigo-600">{feature.title}</h3>
                  <p className="text-lg text-gray-600">{feature.desc}</p>
                </div>
              </motion.section>
              {index < studentFeatures.length - 1 && (
                <ConnectingThread
                  direction={index % 2 === 0 ? "left-to-right" : "right-to-left"}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="mx-auto text-center max-w-7xl">
          <h2 className="mb-16 text-4xl font-bold text-indigo-600 md:text-5xl">
            How It Works
          </h2>
          <div className="flex flex-col justify-center gap-12 md:flex-row">
            {[
              {
                step: "Sign Up",
                desc: "Create your account in minutes.",
                icon: <FaUserPlus className="w-16 h-16 mx-auto mb-4 text-indigo-600" />,
              },
              {
                step: "Learn & Code",
                desc: "Access courses and coding tracks.",
                icon: <FaBook className="w-16 h-16 mx-auto mb-4 text-indigo-600" />,
              },
              {
                step: "Grow",
                desc: "Track progress and land opportunities.",
                icon: <FaChartLine className="w-16 h-16 mx-auto mb-4 text-indigo-600" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex-1 p-6 bg-white rounded-lg shadow-md"
              >
                {item.icon}
                <h3 className="mb-2 text-2xl font-semibold text-gray-800">{item.step}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="px-8 py-20 bg-white">
        <div className="mx-auto text-center max-w-7xl">
          <h2 className="mb-16 text-4xl font-bold text-indigo-600 md:text-5xl">
            Your Personalized Dashboard
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl p-4 mx-auto bg-gray-200 rounded-lg shadow-xl"
          >
            <div className="flex mb-4 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <img
              src={assets.dashboardPreview}
              alt="Dashboard Preview"
              className="w-full rounded"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="mx-auto text-center max-w-7xl">
          <h2 className="mb-16 text-4xl font-bold text-indigo-600 md:text-5xl">
            Why Choose Campus Bridge?
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                title: "Integrated Platform",
                desc: "Combine academic learning and coding practice seamlessly in one platform, saving you time and effort.",
                img: assets.integrated,
              },
              {
                title: "AI-Powered",
                desc: "Leverage smart assistance for personalized learning and coding feedback.",
                img: assets.aiDebug,
              },
              {
                title: "Career-Focused",
                desc: "Develop skills that align with industry demands and boost your employability.",
                img: assets.jobMatch,
              },
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-white rounded-lg shadow-md"
              >
                <img
                  src={reason.img}
                  alt={reason.title}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="mb-2 text-2xl font-semibold text-gray-800">{reason.title}</h3>
                <p className="text-gray-600">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="px-8 py-20 text-center text-white bg-gradient-to-r from-blue-600 to-emerald-500">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-6 text-4xl font-bold md:text-5xl"
        >
          Ready to Transform Your Future?
        </motion.h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl">
          Join thousands of students mastering academics and coding with Campus Bridge.
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="px-12 py-6 font-semibold text-indigo-700 transition bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            Sign Up Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/about")}
            className="px-12 py-6 font-semibold text-white transition bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-indigo-700"
          >
            Learn More
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;