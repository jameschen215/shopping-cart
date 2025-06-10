export default function LoadingPage({ pageName }: { pageName: string }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      Loading {pageName} ...
    </div>
  );
}
