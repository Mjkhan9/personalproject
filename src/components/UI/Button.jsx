import { motion } from 'framer-motion';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-neutral-dark hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'bg-neutral-dark text-white hover:bg-black focus:ring-neutral-dark',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-neutral-dark focus:ring-primary',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function IconButton({ 
  children, 
  variant = 'ghost', 
  size = 'md', 
  className = '',
  ...props 
}) {
  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <Button 
      variant={variant} 
      className={`${sizes[size]} rounded-full ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

