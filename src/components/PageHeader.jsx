import PropTypes from 'prop-types';

const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      {description && (
        <p className="text-neutral-600 max-w-2xl mx-auto">{description}</p>
      )}
      <div className="w-20 h-1 bg-primary-600 mx-auto mt-4"></div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default PageHeader;