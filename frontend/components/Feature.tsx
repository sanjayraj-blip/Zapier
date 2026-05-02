interface FeatureProps {
  number: any;
  text: string;
}

const Feature = ({ number, text }: FeatureProps) => {
  return (
    <div className="text-center">
      <p className="text-2xl text-orange-600">{number}</p>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Feature;
