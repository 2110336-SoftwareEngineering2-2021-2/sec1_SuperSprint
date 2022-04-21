import randomWithSeed from './randomWithSeed';

const bgColors = [
  'bg-[#ff9999]',
  'bg-[#ffaa99]',
  'bg-[#ffbb99]',
  'bg-[#ffcc99]',
  'bg-[#ffdd99]',
  'bg-[#ffee99]',
  'bg-[#ffff99]',
  'bg-[#eeff99]',
  'bg-[#ddff99]',
  'bg-[#ccff99]',
  'bg-[#bbff99]',
  'bg-[#aaff99]',
  'bg-[#99ff99]',
  'bg-[#99ffaa]',
  'bg-[#99ffbb]',
  'bg-[#99ffcc]',
  'bg-[#99ffdd]',
  'bg-[#99ffee]',
  'bg-[#99ffff]',
  'bg-[#99eeff]',
  'bg-[#99ddff]',
  'bg-[#99ccff]',
  'bg-[#99bbff]',
  'bg-[#99aaff]',
  'bg-[#9999ff]',
  'bg-[#aa99ff]',
  'bg-[#bb99ff]',
  'bg-[#cc99ff]',
  'bg-[#dd99ff]',
  'bg-[#ee99ff]',
  'bg-[#ff99ff]',
  'bg-[#ff99ee]',
  'bg-[#ff99dd]',
  'bg-[#ff99cc]',
  'bg-[#ff99bb]',
  'bg-[#ff99aa]',
  'bg-[#ff9999]',
];

export default function getPastelBgClass(seed) {
  console.log(
    randomWithSeed(seed.toString()) % bgColors.length,
    bgColors.length
  );
  return bgColors[randomWithSeed(seed.toString()) % bgColors.length];
}
