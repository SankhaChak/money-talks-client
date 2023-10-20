import clsx from "clsx";

type Props = {
  className?: HTMLDivElement["className"];
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
};

const Container = (props: Props) => {
  const { className, children, as } = props;

  const ContainerTag = as || "div";

  return (
    <ContainerTag className={clsx("max-w-6xl mx-auto px-4", className)}>
      {children}
    </ContainerTag>
  );
};

export default Container;
