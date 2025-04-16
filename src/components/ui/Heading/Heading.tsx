import styles from './Heading.module.css';

interface HeadingProps {
  headingTag: 'h1' | 'h2';
  text: string;
}

const Heading = ({ headingTag = 'h1', text }: HeadingProps) => {
  return headingTag === 'h2' ? (
    <h2 className={styles['heading-h2']}>{text}</h2>
  ) : (
    <h1 className={styles.heading}>{text}</h1>
  );
};

export default Heading;
