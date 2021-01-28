import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Container,
  Box,
  TextField,
  Input,
  Button,
  Grid,
  FormControl,
  MenuItem,
  Collapse,
  IconButton,
  Select,
  InputLabel,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const items = {
  Fish: 600,
  Meat: 700,
  Chicken: 550,
  Egg: 100,
  Milk: 300,
  Butter: 900,
  Noodles: 350,
  Fruit: 450,
  Vegetable: 250,
  Snacks: 650,
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [itemsName, setItemsName] = React.useState([]);

  const handleChange = (event) => {
    setItemsName(event.target.value);
  };

  const submitHandler = () => {
    if (itemsName.length === 0) {
      setError('Please Select any Field');
      return;
    }

    setLoading(true);
    const url = 'http://localhost:5000/api/test';
    ///const url = 'https://ipt-lab.herokuapp.com/api/test';
    axios
      .post(url, {
        itemBody: itemsName,
      })
      .then(({ data: response }) => {
        setLoading(false);
        setError(response.message);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <Container maxWidth="md">
      <Box
        style={{ border: '3px solid black', padding: '3em', marginTop: '5em' }}
      >
        {error && (
          <Collapse in={error !== null}>
            <Alert
              variant="outlined"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(null);
                  }}
                >
                  {error}
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error.message}
            </Alert>
          </Collapse>
        )}

        {/* Main input boxes */}
        <Grid container direction="column">
          <Grid item container justify="space-around">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-name-label">Select items</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={itemsName}
                onChange={handleChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {Object.keys(items).map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, itemsName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Check
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
