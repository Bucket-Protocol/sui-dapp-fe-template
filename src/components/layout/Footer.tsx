import { SOCIALS_LINKS } from '@/consts/navigation';
import SocialLinkButton from '@/components/layout/SocialLinkButton';

const Footer = () => (
  <footer className="fixed inset-x-0 bottom-0 z-footer hidden items-center justify-between px-8 py-4 backdrop-blur-md lg:flex">
    <div className="flex flex-1 justify-end gap-2">
      {SOCIALS_LINKS.map((link) => (
        <SocialLinkButton
          key={link.name}
          {...link}
        />
      ))}
    </div>
  </footer>
);

export default Footer;
