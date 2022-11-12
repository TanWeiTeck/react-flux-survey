import styles from './ProgressBar.module.css';

type ProgressBarProps = {
    progress: number;
    color?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
    const widthPercent = progress && progress * 100 + '%';

    return (
        <div className={styles.container}>
            <div
                className={styles.progressbar}
                style={{ width: widthPercent, backgroundColor: color }}
            ></div>
        </div>
    );
};

export default ProgressBar;
