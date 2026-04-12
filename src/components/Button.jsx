import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus-visible:ring-primary-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-white text-primary-700 border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 focus-visible:ring-primary-500',
    outline: 'bg-transparent text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 focus-visible:ring-white',
    ghost: 'bg-transparent text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500',
    accent: 'bg-gradient-to-r from-accent-500 to-primary-500 text-white hover:from-accent-600 hover:to-primary-600 focus-visible:ring-accent-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none' : '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
