import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBookStore } from '../store/useBookStore';

export const BookShelf: React.FC = () => {
  const { books, removeBook } = useBookStore();
  const navigate = useNavigate();

  const handleBookClick = (bookId: string) => {
    navigate(`/reader/${bookId}`);
  };

  if (books.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          书架空空如也，请上传小说开始阅读
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={book.coverUrl}
              alt={book.title}
              onClick={() => handleBookClick(book.id)}
              sx={{ 
                cursor: 'pointer',
                objectFit: 'cover'
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
              <IconButton
                size="small"
                onClick={() => removeBook(book.id)}
                sx={{ float: 'right', mt: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};