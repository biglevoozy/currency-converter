import styles from './Heading.module.css';

interface HeadingProps {
  headingTag: 'h1' | 'h2';
  text: string;
}

const Heading = ({ headingTag = 'h1', text }: HeadingProps) => {
  switch (headingTag) {
    case 'h1':
      return <h1 className={styles.heading}>{text}</h1>;
    case 'h2':
      return <h2 className={styles['heading-h2']}>{text}</h2>;
  }
};

export default Heading;
