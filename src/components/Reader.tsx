import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  IconButton,
  Drawer,
  Slider,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useBookStore } from '../store/useBookStore';
import { useSettingsStore } from '../store/useSettingsStore';

export const Reader: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { books, currentBook, setCurrentBook, updateReadingPosition } = useBookStore();
  const { settings, updateSettings } = useSettingsStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const book = books.find((b) => b.id === bookId);
    setCurrentBook(book || null);
  }, [bookId, books, setCurrentBook]);

  if (!currentBook) {
    return <Typography>Book not found</Typography>;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={() => setSettingsOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </Box>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: 3,
          overflow: 'auto',
          bgcolor: settings.theme === 'dark' ? '#121212' : '#fff',
          color: settings.theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Box
          sx={{
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
            fontFamily: settings.fontFamily,
          }}
        >
          {currentBook.content}
        </Box>
      </Paper>

      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <Box sx={{ width: 250, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            阅读设置
          </Typography>

          <Typography gutterBottom>字体大小</Typography>
          <Slider
            value={settings.fontSize}
            min={12}
            max={24}
            onChange={(_, value) => updateSettings({ fontSize: value as number })}
          />

          <Typography gutterBottom>行高</Typography>
          <Slider
            value={settings.lineHeight}
            min={1}
            max={2}
            step={0.1}
            onChange={(_, value) => updateSettings({ lineHeight: value as number })}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>主题</InputLabel>
            <Select
              value={settings.theme}
              onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' })}
            >
              <MenuItem value="light">浅色</MenuItem>
              <MenuItem value="dark">深色</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>
    </Box>
  );
};