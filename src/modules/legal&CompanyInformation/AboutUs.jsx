import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className='bg-base-100 min-h-screen'>
      {/* Hero Section */}
      <div className='hero bg-base-200 py-12 sm:py-20 px-4'>
        <div className='hero-content text-center'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl sm:text-6xl font-black text-primary tracking-tighter mb-4'>
              About basic-ecom
            </h1>
            <p className='text-lg sm:text-xl text-base-content/70 italic'>
              {`"Building scalable digital systems with a software engineer’s logic and architectural clarity."`}
            </p>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12 max-w-5xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          {/* Section 1: The Vision */}
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-base-content'>
              The Visionary
            </h2>
            <p className='text-base-content/80 leading-relaxed'>
              Founded by <strong>Bibhu Prasad Rout</strong>, a passionate Web
              Developer with a foundation in Software Engineering. This platform
              serves as a testament to the journey of transitioning complex
              physical logic into robust digital architectures.
            </p>
            <p className='text-base-content/80 leading-relaxed'>
              With a focus on the <strong>MERN stack</strong>, Bibhu specializes
              in building high-performance, user-centric applications that solve
              real-world problems through clean code and intuitive design.
            </p>
            <div className='flex gap-4'>
              <a
                href='https://github.com/khoka07'
                target='_blank'
                rel='noreferrer'
                className='btn btn-outline btn-primary btn-sm sm:btn-md'>
                GitHub Profile
              </a>
              <a
                href='https://bibhuprasadrout.netlify.app'
                target='_blank'
                rel='noreferrer'
                className='btn btn-primary btn-sm sm:btn-md'>
                Portfolio
              </a>
            </div>
          </div>

          {/* Section 2: Technical Prowess (Card Style) */}
          <div className='bg-base-200 p-8 rounded-3xl shadow-inner border border-base-300'>
            <h3 className='text-xl font-black uppercase tracking-widest text-primary mb-6'>
              Technological Stack
            </h3>
            <div className='flex flex-wrap gap-2'>
              {[
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Redux Toolkit",
                "Tailwind CSS",
                "Axios",
                "DaisyUI",
              ].map((tech) => (
                <div key={tech} className='badge badge-lg badge-outline py-4'>
                  {tech}
                </div>
              ))}
            </div>
            <div className='mt-8 pt-6 border-t border-base-content/10'>
              <h4 className='font-bold mb-2'>Key Competencies:</h4>
              <ul className='list-disc list-inside text-sm text-base-content/70 space-y-1'>
                <li>Restful API Architecture</li>
                <li>Responsive UI/UX Development</li>
                <li>State Management Optimization</li>
                <li>Mechanical-to-Digital Logic Mapping</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className='stats stats-vertical lg:stats-horizontal shadow bg-base-200 w-full mt-20 border border-base-300'>
          <div className='stat place-items-center'>
            <div className='stat-title text-base-content/60'>
              Projects Completed
            </div>
            <div className='stat-value text-primary'>15+</div>
            <div className='stat-desc'>Across various domains</div>
          </div>

          <div className='stat place-items-center'>
            <div className='stat-title text-base-content/60'>
              GitHub Contributions
            </div>
            <div className='stat-value text-secondary'>500+</div>
            <div className='stat-desc'>Committed to open source</div>
          </div>

          <div className='stat place-items-center'>
            <div className='stat-title text-base-content/60'>
              Logic Precision
            </div>
            <div className='stat-value text-accent'>100%</div>
            <div className='stat-desc'>Mechanical Accuracy</div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div className='mt-20 text-center bg-primary rounded-3xl p-8 sm:p-12 text-primary-content'>
          <h2 className='text-3xl sm:text-4xl font-black mb-4'>
            {`Let's build something together.`}
          </h2>
          <p className='mb-8 opacity-90 max-w-xl mx-auto'>
            {`Whether it's a complex e-commerce solution or a specialized internal
            tool, Bibhu is ready to translate your requirements into
            high-quality code.`}
          </p>
          <Link
            to='/signup'
            className='btn btn-neutral btn-wide border-none shadow-lg'>
            Join the Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
