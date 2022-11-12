import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './Card.module.css';

type CardProps = {
    title?: string;
    subTitle?: string | JSX.Element;
    content?: JSX.Element;
    okText?: string;
    onSubmit?: any;
    cancelText?: string;
    onCancel?: () => void;
    btnDisable?: boolean;
    progressBar?: boolean;
    progress?: number;
};

const Card: React.FC<CardProps> = (props) => {
    return (
        <>
            <div className={styles.container}>
                {props.progressBar && (
                    <ProgressBar
                        progress={props.progress || 0}
                        color={'#3498db'}
                    />
                )}
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
            <div className={styles.copyright}>
                powered by © <a href={'https://www.driveflux.com/'}>Flux</a>{' '}
                2020 (sample)
            </div>
        </>
    );
};

export default Card;
