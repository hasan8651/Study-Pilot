import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="min-h-screen mb-2 shadow-lg rounded-lg">
      <Helmet>
        <title>Study Pilot - About Us</title>
      </Helmet>
      <section className="max-w-5xl card-surface mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          About Study Pilot
        </h1>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Study Pilot is a modern learning platform that turns curiosity into
            career-ready skills through expert-led courses, real projects, and a
            supportive community.
          </li>
          <li>
            Our mission is to make high-quality tech education accessible and
            practical—clear roadmaps, hands-on practice, and outcomes you can
            showcase.
          </li>
          <li>
            We connect passionate instructors with motivated learners, offering
            curated paths across web, mobile, data, cloud, and more.
          </li>
          <li>
            Built by educators and engineers, Study Pilot focuses on an
            intuitive UI, measurable progress, and up-to-date content.
          </li>
          <li>
            Learn at your pace with lifetime access, mobile-friendly lessons,
            and certificates that highlight your achievements.
          </li>
          <li>
            We believe the best learning happens together—join study groups, ask
            questions, and collaborate on real projects.
          </li>
          <li>
            Every course is designed around real-world scenarios, mentoring, and
            feedback to help you ship portfolio-worthy work.
          </li>
          <li>
            Your success is our measure—skills gained, projects delivered, and
            opportunities unlocked.
          </li>
          <li>
            From beginners to pros, we guide you step-by-step so you can learn,
            build, and grow with confidence.
          </li>
          <li>
            Inclusive by design: accessible content, supportive community, and
            practical guidance at every stage of your journey.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
