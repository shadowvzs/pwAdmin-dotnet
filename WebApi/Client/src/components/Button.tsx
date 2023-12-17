const design = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded',
    ghost: 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded',
    danger: 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded',
    default: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    appearance: keyof typeof design;
}
const Button = ({appearance, ...props}: ButtonProps) => (
    // eslint-disable-next-line react/button-has-type
    <button {...props} className={design[appearance]} />
);

export default Button;