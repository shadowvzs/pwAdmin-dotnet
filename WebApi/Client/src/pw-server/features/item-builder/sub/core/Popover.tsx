interface PopoverProps {
    children: React.JSX.Element;
    open?: boolean;
    boxStyle?: React.CSSProperties;
}

const Popover = ({ children, open, boxStyle, ...props}: PopoverProps) => (
    <div
        className={`absolute ${open ? 'block' : 'hidden'} bg-white z-10 border-[1px] border-gray-200 rounded`}
        style={{ width: 240, ...boxStyle }}
        {...props}
    >
        {children}
    </div>
);

export default Popover;