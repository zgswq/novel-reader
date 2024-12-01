import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { BookShelf } from './components/BookShelf';
import { Reader } from './components/Reader';
import { FileUpload } from './components/FileUpload';
import { MainLayout } from './layout/MainLayout';
import { CustomThemeProvider } from './themes/ThemeProvider';

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FileUpload />
                  <BookShelf />
                </>
              }
            />
            <Route path="/reader/:bookId" element={<Reader />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;