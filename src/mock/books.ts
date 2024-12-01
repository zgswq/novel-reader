import { Book } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '三体',
    author: '刘慈欣',
    content: `第一章 科学边界
    "你看到了什么？"
    "我看到了光。"
    "什么光？"
    "太阳的光。"
    "太阳？可现在是半夜。"
    "我知道，但我看到了太阳的光。"
    ...`,
    coverUrl: 'https://example.com/santi.jpg',
    lastReadPosition: 0,
    addedAt: Date.now(),
  },
  {
    id: '2',
    title: '活着',
    author: '余华',
    content: `第一章
    我比现在年轻十岁的时候，获得了一个游手好闲的职业，去乡间收集民间歌谣。那一年的整个夏天，我如同一只乱飞的麻雀，游荡在知了和阳光充斥的村庄...`,
    coverUrl: 'https://example.com/huozhe.jpg',
    lastReadPosition: 0,
    addedAt: Date.now() - 86400000,
  },
];