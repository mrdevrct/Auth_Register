import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  pageLink: string;
}

export default function PageHeader({ title, pageLink }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
      <Link to={pageLink} className="text-blue-600 hover:underline text-sm">
        مشاهده همه
      </Link>
    </div>
  );
}
