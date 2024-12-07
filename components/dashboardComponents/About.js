import React from "react";

const About = () => {
  return (
    <div className="bg-red-50 py-10 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* About Us Header */}
        <h1 className="text-4xl font-bold text-center mb-4 text-red-700">
          About Us
        </h1>
        <p className="text-center text-red-600 mb-8">
          Welcome to Findyfy, your trusted platform for finding and reporting
          lost and found items. Our mission is to connect individuals and create
          a community where lost belongings can be reunited with their owners.
        </p>

        {/* Our Team Section */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-red-600">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <img
              src="/assets/image/team-member1.jpg"
              alt="Team Member 1"
              className="rounded-full w-24 h-24 mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-red-700">Demo person</h3>
            <p className="text-red-600">Founder & CEO</p>
            <p className="text-center mt-2 text-red-600">
              Alice is passionate about creating technology solutions that make
              a positive impact on society.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <img
              src="/assets/image/team-member2.jpg"
              alt="Team Member 2"
              className="rounded-full w-24 h-24 mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-red-700">Demo person</h3>
            <p className="text-red-600">CTO</p>
            <p className="text-center mt-2 text-red-600">
              Bob leads our tech team with a focus on innovative solutions and
              efficient software development.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <img
              src="/assets/image/team-member3.jpg"
              alt="Team Member 3"
              className="rounded-full w-24 h-24 mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-red-700">Demo person</h3>
            <p className="text-red-600">Marketing Specialist</p>
            <p className="text-center mt-2 text-red-600">
              Charlie is dedicated to sharing our mission with the world and
              building a strong community around Findyfy.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <h2 className="text-3xl font-semibold text-center mt-10 mb-4 text-red-600">
          Get in Touch
        </h2>
        <p className="text-center text-red-600 mb-4">
          Have questions or feedback? Reach out to us at{" "}
          <a
            href="mailto:info@findyfy.com"
            className="text-indigo-600 hover:underline"
          >
            info@findyfy.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
