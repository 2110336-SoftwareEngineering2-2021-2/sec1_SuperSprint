import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';

const fallbackProfileUrl =
  'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

export default function avatarUrl(url, seed = 'skdfjh3usadlkfj') {
  console.log(seed);
  return url !== fallbackProfileUrl
    ? url
    : createAvatar(style, {
        seed: seed,
        dataUri: true,
      });
}
