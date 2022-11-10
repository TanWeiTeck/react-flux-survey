import Button from '../Button';
import styles from './Card.module.css';

type CardProps = {
    title?: string;
    subTitle?: string;
    content?: any;
    onSubmit?: any;
    onCancel?: () => void;
    okText?: any;
    cancelText?: any;
    btnDisable?: any;
};

const Card: React.FC<CardProps> = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.subtitle}>{props.subTitle}</div>
            </div>
            <form onSubmit={props.onSubmit}>
                {props.content}
                <footer className={styles.footer}>
                    {props.cancelText && (
                        <Button
                            type="button"
                            onClick={props.onCancel}
                            color="white"
                        >
                            {props.cancelText}
                        </Button>
                    )}
                    <Button type="submit" disabled={props.btnDisable}>
                        {props.okText}
                    </Button>
                </footer>
            </form>
        </div>
    );
};

export default Card;
