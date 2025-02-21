// utils/fetchLocalData.js
import fs from 'fs';
import path from 'path';

export function fetchLocalData() {
  const seriesPath = path.join(process.cwd(), 'public/assets/localDB/series.json');
  const setsPath = path.join(process.cwd(), 'public/assets/localDB/sets.json');

  const seriesData = JSON.parse(fs.readFileSync(seriesPath, 'utf8'));
  const setsData = JSON.parse(fs.readFileSync(setsPath, 'utf8'));

  return { seriesData, setsData };
}
