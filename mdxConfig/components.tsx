import Heading from "components/Heading";

const mdxComponentsMapping = {
  h2: (props: any) => <Heading {...props} type="h2" my={4} />,
  h3: (props: any) => <Heading {...props} type="h3" my={3} />,
  h4: (props: any) => <Heading {...props} type="h4" my={2} />,
  h5: (props: any) => <Heading {...props} type="h5" my={2} />,
};

export default mdxComponentsMapping;
