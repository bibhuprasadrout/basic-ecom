import PropTypes from "prop-types";
const PolicyLayout = ({ title, children }) => (
  <div className='bg-base-100 min-h-screen py-12 px-4'>
    <div className='max-w-3xl mx-auto bg-base-200 p-8 sm:p-12 rounded-3xl shadow-sm border border-base-300'>
      <h1 className='text-3xl sm:text-4xl font-black text-primary mb-8 tracking-tighter border-b border-base-content/10 pb-4'>
        {title}
      </h1>
      <div className='prose prose-sm sm:prose-base text-base-content/80 leading-relaxed'>
        {children}
      </div>
    </div>
  </div>
);
PolicyLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PolicyLayout;
