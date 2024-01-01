const Select = ({ className, ...props }: React.HTMLProps<HTMLSelectElement>) => (
    <select {...props} className={`border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 px-2 ${className}`} />
);

export default Select;