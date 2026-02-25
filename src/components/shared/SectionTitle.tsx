type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props): JSX.Element => {
  if (!title || title.trim().length === 0) return <></>;
  return (
    <h2 className="text-foreground text-lg font-medium leading-5 tracking-normal overflow-hidden text-ellipsis line-clamp-2 mb-3">
      {title}
    </h2>
  );
};

export default SectionTitle;
