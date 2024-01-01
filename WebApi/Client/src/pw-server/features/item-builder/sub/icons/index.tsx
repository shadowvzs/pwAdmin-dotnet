import { SVGProps } from 'react';
import ExpandIcon from './ExpandIcon';
import CollapseIcon from './CollapseIcon';
import SettingsIcon from './SettingsIcon';
import AddIcon from './AddIcon';
import DeleteIcon from './DeleteIcon';
import CopyIcon from './CopyIcon';

const iconMap = {
    add: AddIcon,
    delete: DeleteIcon,
    copy: CopyIcon,
    expand: ExpandIcon,
    collapse: CollapseIcon,
    settings: SettingsIcon,
};

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    icon: keyof typeof iconMap;
}

export const Icon = ({ size = 24, icon, ...props }: IconProps) => {
    const Cmp = iconMap[icon];
    return <Cmp {...props} width={props.width ?? size} height={props.height ?? size} />;
};

interface IconButtonProps extends IconProps {
    onClick?: (ev: React.MouseEvent<Element>) => void;
    disabled?: boolean;
    title?: string;
}

export const IconButton = ({ onClick, disabled, title, ...props }: IconButtonProps) => (
    <button onClick={onClick} type='button' disabled={disabled} title={title} className={disabled ? 'opacity-55' : 'opacity-100'}>
        <Icon {...props} />
    </button>
);
