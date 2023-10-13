import useScreenSize from 'hooks/useScreenSize';

type InnerButtonProps = {
  icon: string;
  text: string;
};

export default function InnerButton({ icon, text }: InnerButtonProps) {
  const [screenSize, _setScreenSize] = useScreenSize();

  return <>{screenSize.width < 800 ? <img width={24} src={icon} /> : text}</>;
}
