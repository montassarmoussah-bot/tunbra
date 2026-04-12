const Section = ({ 
  children, 
  className = '', 
  id = '', 
  dark = false,
  gradient = false
}) => {
  return (
    <section
      id={id}
      className={`relative w-full ${
        dark 
          ? 'bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 text-white' 
          : gradient
            ? 'bg-gradient-to-br from-primary-50 via-white to-accent-50'
            : 'bg-white'
      } ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
