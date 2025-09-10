interface GridFilterLayoutProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const GridFilterLayout = ({ left, right }: GridFilterLayoutProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-[calc(var(--spacing)*3)]">{left}</div>
      <div className="flex items-center gap-[calc(var(--spacing)*3)]">{right}</div>
    </div>
  );
};

export const FilterLayout = ({ left, right }: GridFilterLayoutProps) => {};
