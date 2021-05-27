import SSRSafeSuspense from './SSRSafeSuspense';
import ErrorBoundary from './ErrorBoundary';

type ErrorBoundaryProps = React.ComponentProps<typeof ErrorBoundary>;

interface AsyncBoundaryProps extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: React.ComponentProps<typeof SSRSafeSuspense>['fallback'];
  rejectedFallback: ErrorBoundaryProps['renderFallback'];
}

function AsyncBoundary({
  pendingFallback,
  rejectedFallback,
  children,
  ...errorBoundaryProps
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary renderFallback={rejectedFallback} {...errorBoundaryProps}>
      <SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
