type Props = {
    title: string;
    subtitle?: string;
  };
  
  export default function SectionHeader({ title, subtitle }: Props) {
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-semibold">{title}</h2>
  
        {subtitle && (
          <p className="text-gray-500 mt-2">{subtitle}</p>
        )}
      </div>
    );
  }