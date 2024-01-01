const Input = ({ className, ...props }: React.HTMLProps<HTMLInputElement>) => (
    <input {...props} className={`border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2 ${className}`} />
);

export default Input;