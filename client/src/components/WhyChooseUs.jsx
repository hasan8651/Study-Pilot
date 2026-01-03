const WhyChooseUs = () => {
  const features = [
    {
      title: "Expert-Led Courses",
      description:
        "Learn from seasoned industry professionals with real project experience.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 6v12M6 12h12" />
          <rect x="3" y="3" width="18" height="18" rx="4" strokeOpacity="0.4" />
        </svg>
      ),
    },
    {
      title: "Flexible Learning",
      description:
        "Self-paced modules with lifetime access and mobile-friendly lessons.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 12h18M12 3v18" strokeOpacity="0.4" />
          <path d="M7 7h10v10H7z" />
        </svg>
      ),
    },
    {
      title: "Real Projects",
      description:
        "Build portfolio-ready projects to showcase your skills to employers.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 7h16M4 12h10M4 17h7" />
          <rect x="3" y="4" width="18" height="16" rx="3" strokeOpacity="0.4" />
        </svg>
      ),
    },
    {
      title: "Career Support",
      description: "Interview prep, CV reviews, and guidance from mentors.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5z" />
          <path d="M3 21a9 9 0 0 1 18 0" strokeOpacity="0.4" />
        </svg>
      ),
    },
    {
      title: "Community Access",
      description:
        "Join study groups, ask questions, and collaborate with peers.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M7 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path
            d="M2 22a6 6 0 0 1 10-4M12 22a6 6 0 0 1 10-4"
            strokeOpacity="0.4"
          />
        </svg>
      ),
    },
    {
      title: "Certificates",
      description:
        "Earn shareable certificates to validate your learning outcomes.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M7 7h10v10H7z" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeOpacity="0.4" />
        </svg>
      ),
    },
  ];
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl py-4 section-gradient font-semibold text-center ">
            Why Choose Us{" "}
          </h1>
          <p className="mt-3 text-base-content/70 max-w-5xl mx-auto">
            A modern platform focused on outcomes, hands-on learning, and a
            supportive community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="card card-surface shadow-md hover:shadow-xl transition-shadow"
            >
              <div data-aos="zoom-in" className="card-body">
                <div className="mb-3">{f.icon}</div>
                <h3 className="card-title text-base-content">{f.title}</h3>
                <p className="text-base-content/70">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
