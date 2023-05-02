import styles from "./Spinner.module.scss";

interface Props {
  size?: number;
}

const Spinner = ({ size= 40 }: Props) => {
  return (
    <div className={styles.spinner} style={{ width: size, height: size }} />
  );
};

export default Spinner;
