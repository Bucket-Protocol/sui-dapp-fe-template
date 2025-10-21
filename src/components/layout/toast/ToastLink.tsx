import Link from 'next/link';

const ToastLink = ({ digest }: { digest: string }) => (
  <Link
    href={`https://suivision.xyz/txblock/${digest}`}
    target="_blank"
  >
    <span>
      Transaction succeeded. <br /> Click to see on explorer.
    </span>
  </Link>
);

export default ToastLink;
