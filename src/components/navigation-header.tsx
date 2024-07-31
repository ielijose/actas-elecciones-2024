import Link from "next/link";

interface NavigationHeaderProps {
  state?: string;
  municipality?: string;
  parish?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  state,
  municipality,
  parish,
}) => {
  return (
    <h1 className="text-3xl font-bold mb-4 mt-12 text-center">
      {state && (
        <Link
          href={`/stats/state/${encodeURIComponent(state)}`}
          className="hover:underline"
        >
          {state}
        </Link>
      )}
      {state && municipality && (
        <>
          {" - "}
          <Link
            href={`/stats/state/${encodeURIComponent(
              state
            )}/${encodeURIComponent(municipality)}`}
            className="hover:underline"
          >
            {municipality}
          </Link>
        </>
      )}
      {parish && (
        <>
          {" - "}
          <span>{parish}</span>
        </>
      )}
    </h1>
  );
};
