import './Button.css';

type ButtonProps = {
    color?: string;
    type: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    children?: JSX.Element;
};

const Button = ({ ...props }: ButtonProps) => {
    return (
        <button
            className={props.color}
            type={props.type}
            disabled={props.disabled}
        >
            {props.children || 'button'}
        </button>
    );
};

export default Button;
