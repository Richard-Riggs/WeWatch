import React, { memo, useContext, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import MovieRatings from './MovieRatings';
import useStyles from './styles/MovieCardStyles';
import { MovieListsContext } from './contexts/MovieListsContext';
import useToggleState from './hooks/useToggleState';

function MovieCard(props) {
  const { movie, openInfo, mode, selectLimit = 0 } = props;
  const { title, poster_path, ratings, id } = movie;
  const theme = useTheme();
  const classes = useStyles(props);
  const { toggleMovie, selectedMovies } = useContext(MovieListsContext);
  const selected = selectedMovies.find((sm) => sm.id === id) ? true : false;
  const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;

  const handleInfoClick = (e) => {
    e.stopPropagation();
    openInfo(id);
  };

  const handleCardClick = () => {
    // Card is toggleable if it's already selected, if there's no select limit,
    // or if the number of selected movies is under the select limit
    if (selected || (!selectLimit || selectedMovies.length < selectLimit)) {
      if (mode !== 'view') {
        toggleMovie(movie);
      }
    }
  };

  return (
    <Grid className={classes.gridItem} onClick={handleCardClick} item xs={12} sm={6} md={4} lg={3}>
    <Grid className={classes.gridItem} onClick={handleCardClick} item xs="auto">
      <Card
        elevation={3}
        className={`${classes.root} ${selected && classes.selected} ${((mode === 'edit' && !selected) ||
          (!selected && selectLimit && selectedMovies.length >= selectLimit)) &&
          classes.disabled}`}
      >
        <CardMedia className={classes.poster} component="div" alt={title} title={title} />
        <CheckCircleRoundedIcon className={classes.selectedIcon} fontSize="large" />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2" className={`${classes.title}`}>
            {title}
            <IconButton className={classes.infoButton} size={'medium'} onClick={handleInfoClick}>
              <InfoIcon className={classes.icon} fontSize="large" />
            </IconButton>
          </Typography>
          {ratings && <MovieRatings ratings={ratings} id={id} />}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default memo(MovieCard);
