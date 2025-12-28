/* ConsejoSeguro Button component, adaptable al color y con accesibilidad */
export default function Button({ as: Component = 'button', color = 'primary', className = '', children, ...props }) {
  const colorStyles = {
    primary: 'bg-[#003366] text-white hover:bg-[#00214d] focus-visible:ring-2 focus-visible:ring-accent',
    secondary: 'bg-[#008000] text-white hover:bg-[#005a00] focus-visible:ring-2 focus-visible:ring-accent',
    accent: 'bg-[#FFA500] text-white hover:bg-[#cc8400] focus-visible:ring-2 focus-visible:ring-primary',
  };
  return (
    <Component
      {...props}
      className={`rounded-xl font-condensed px-5 py-2 shadow-md focus-visible:outline-none transition-colors font-semibold text-base ${colorStyles[color] || ''} ${className}`}
    >{children}</Component>
  );
}

