import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { useBookStore } from '../store/useBookStore';

export const FileUpload: React.FC = () => {
  const { addBook } = useBookStore();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const newBook = {
        id: Date.now().toString(),
        title: file.name.replace('.txt', ''),
        author: 'Unknown',
        content,
        coverUrl: 'https://example.com/default-cover.jpg',
        lastReadPosition: 0,
        addedAt: Date.now(),
      };
      addBook(newBook);
    };
    reader.readAsText(file);
  }, [addBook]);

  return (
    <Button
      variant="contained"
      component="label"
      sx={{ m: 2 }}
    >
      上传小说
      <input
        type="file"
        hidden
        accept=".txt"
        onChange={handleFileUpload}
      />
    </Button>
  );
};