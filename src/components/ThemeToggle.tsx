import React from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  useTheme, 
  Switch, 
  FormControlLabel,
  Divider,
  Typography,
  Box
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SyncIcon from '@mui/icons-material/Sync';
import { useThemeStore } from '../store/useThemeStore';
import { ThemeMode } from '../themes/types';

export const ThemeToggle: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { settings, setThemeMode, syncWithSystem, setSyncWithSystem } = useThemeStore();
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    handleClose();
  };

  const handleSyncToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSyncWithSystem(event.target.checked);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        {settings.mode === 'dark' ? <Brightness7Icon /> : 
         settings.mode === 'light' ? <Brightness4Icon /> : 
         <ColorLensIcon />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={syncWithSystem}
                onChange={handleSyncToggle}
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SyncIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">跟随系统主题</Typography>
              </Box>
            }
          />
        </Box>
        <Divider />
        <MenuItem 
          onClick={() => handleThemeChange('light')}
          disabled={syncWithSystem}
        >
          浅色主题
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('dark')}
          disabled={syncWithSystem}
        >
          深色主题
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('sepia')}
          disabled={syncWithSystem}
        >
          护眼模式
        </MenuItem>
      </Menu>
    </>
  );
};