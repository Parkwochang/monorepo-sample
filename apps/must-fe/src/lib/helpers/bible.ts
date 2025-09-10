'use server';

import fs from 'fs/promises';
import path from 'path';

export const getTodayBible = async () => {
  const biblePath = path.join(process.cwd(), 'public', 'bible-verses.json');

  const bible = await fs.readFile(biblePath, 'utf-8');

  const bibleData = JSON.parse(bible);

  return bibleData[Math.floor(Math.random() * bibleData.length)];
};
