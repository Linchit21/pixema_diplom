import { createClassName } from '@/utils/className';
import styles from './index.module.scss';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';

interface ShareModalProps {
  title: string;
  visible: boolean;
}

export function ShareButtons({ title, visible }: ShareModalProps) {
  const cn = createClassName(styles, 'share-buttons');
  const shareUrl = window.location.href;

  return (
    <>
      {visible && (
        <div className={cn()}>
          <FacebookShareButton url={shareUrl} title={title}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <TelegramShareButton url={shareUrl} title={title}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>
        </div>
      )}
    </>
  );
}
