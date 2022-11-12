import './Button.css';

type ButtonProps = {
    color?: string;
    type: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    children?: JSX.Element | string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button
            className={props.color}
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children || 'button'}
        </button>
    );
};

export default Button;
