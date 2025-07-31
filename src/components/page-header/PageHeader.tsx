import { Link } from "react-router-dom";

export default function PageHeader({
  title,
  bgColor,
  pageLink,
}: {
  title: string;
  bgColor?: string;
  pageLink: string;
}) {
  return (
    <div
      className={`p-4 ${
        bgColor ? `bg-[${bgColor}]` : ""
      } text-center mb-6`}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <div className="text-sm text-gray-400 mt-5">
        <Link to="/" className="hover:text-gray-600">
          خانه
        </Link>
        <span className="mx-1">/</span>
        <Link to={pageLink} className="text-gray-600 font-bold">
          {title}
        </Link>
      </div>
    </div>
  );
}
