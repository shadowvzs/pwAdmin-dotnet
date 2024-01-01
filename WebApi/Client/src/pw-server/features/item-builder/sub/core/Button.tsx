const Button = ({ className, ...props }: React.HTMLProps<HTMLButtonElement>) => (
    <button
        {...props}
        type='button'
        className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${className}`}
    />
);

export default Button;