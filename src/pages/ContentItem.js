import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { EditModal, DeleteModal } from './ModalItem';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Remove from '@material-ui/icons/Remove';
import Build from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Card,
  CardActions
} from "@material-ui/core";

export default class TableContent extends React.Component {

  state = {
    loading: true,
    rows: null,
    page: 1,
    rowsPerPage: 5,
    emptyRows: 5,
    count: 1,
    open: false,
    id: null,
  };

  customStyling = {
    table: {
      minWidth: 500,
      padding: 20,
      paddingBottom: 55,
      webkitBoxShadow: '-1px 1px 5px #b6b6b6',
      mozBoxShadow: '-1px 1px 5px #b6b6b6',
      boxShadow: '-1px 1px 5px #b6b6b6'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    paper: {
      backgroundColor: '#fbfbfb',
      border: '2px solid #000',
    },
    pagination: {
      justifyContent: 'center',
      display: 'flex',
      top: -23,
      zIndex: 1001,
      position: 'relative',
      maxWidth: 'max-content',
      marginLeft: '40%',
      border: 'solid',
      borderWidth: 1,
      borderRadius: 400,
      borderColor: '#b6b6b6',
      backgroundColor: '#fff',
      webkitBoxShadow: '-1px 3px 5px #b6b6b6',
      mozBoxShadow: '-1px 3px 5px #b6b6b6',
      boxShadow: '-1px 3px 5px #b6b6b6',
      padding: 5,
    },
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/items";

    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    this.setState({
      rows: data,
      loading: false,
      emptyRows: this.state.rowsPerPage -
        Math.min(this.state.rowsPerPage, data.length -
          (this.state.page - 1) * this.state.rowsPerPage),
      count: Math.ceil(data.length / this.state.rowsPerPage),
    });
  }


  render() {

    const handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage,
      });
    };
    const handleOpen = rowid => () => {
      this.setState({ open: true, id: rowid });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    const submitForm = async dataForm => {
      const url = "http://localhost:8080/api/items";

      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json()
    }

    return (
      <React.Fragment>
        {this.state.loading || !this.state.rows ?
          (<TableRow style={{ height: 265 }}>
            <Grid item xs='12'>
              <Typography variant='button' display='block'>
                Fetching Data ...
              </Typography>
            </Grid>
          </TableRow>) :

          <Paper style={this.customStyling.table}>
            <TableContainer>
              <Table style={this.customStyling.table} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Group</TableCell>
                    <TableCell>Last Update</TableCell>
                    <TableCell>By</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(this.state.rowsPerPage > 0
                    ? this.state.rows.slice((this.state.page - 1) * this.state.rowsPerPage, (this.state.page - 1) * this.state.rowsPerPage + this.state.rowsPerPage)
                    : this.state.rows
                  ).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.category.name}</TableCell>
                      <TableCell>{row.updatedAt}</TableCell>
                      <TableCell>{row.updatedBy}</TableCell>
                      <TableCell align="right">

                        <Fab
                          size="small"
                          color="red"
                          aria-label="add"
                          style={{ color: "white", backgroundColor: "red", boxShadow: "none", width: 36, height: 36 }}
                          onClick={handleOpen(row.id)}>
                          <Remove />
                        </Fab>
                        <Fab
                          size="small"
                          color="red"
                          aria-label="add"
                          style={{ color: "white", backgroundColor: "#3e81ee", boxShadow: "none", width: 36, height: 36 }}
                          href={handleOpen}>
                          <Build />
                        </Fab>

                      </TableCell>
                    </TableRow>
                  )
                  )}

                  {this.state.emptyRows > 0 && (
                    <TableRow style={{ height: 53 * this.state.emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        }
        <Pagination
          style={this.customStyling.pagination}
          color="secondary"
          colSpan={5}
          page={this.state.page}
          count={this.state.count}
          onChange={handleChangePage}
        />

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={this.customStyling.modal}
          open={this.state.open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div style={this.customStyling.paper}>
              <Card>

                <form style={{ width: 300 }}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom fullWidth style={{ margin: 10 }}>
                    Edit Item
                  </Typography>

                  {!this.state.rows ? (
                    <div>
                      <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                        <InputLabel htmlFor="code">Code</InputLabel>
                        <Input id="code" type="text" />
                      </FormControl>

                      <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input id="description" type="text" />
                      </FormControl>

                      <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                        <InputLabel htmlFor="group">Group</InputLabel>
                        <Input id="group" type="text" />
                      </FormControl>

                      <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                        <InputLabel htmlFor="image">Image</InputLabel>
                        <Input id="image" multiline rows={5} />
                      </FormControl>
                    </div>
                  ) :
                    (this.state.rows)
                      .map(element => {
                        if (element.id === this.state.id) {
                          <div>
                            <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                              <InputLabel htmlFor="code">Code</InputLabel>
                              <Input id="code" type="text" value={element.code} />
                            </FormControl>

                            <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                              <InputLabel htmlFor="description">Description</InputLabel>
                              <Input id="description" type="text" value={element.description} />
                            </FormControl>

                            <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                              <InputLabel htmlFor="group">Group</InputLabel>
                              <Input id="group" type="text" value={element.category.name} />
                            </FormControl>

                            <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                              <InputLabel htmlFor="image">Image</InputLabel>
                              <Input id="image" multiline rows={5} />
                            </FormControl>
                          </div>
                        }
                      })}

                  <CardActions style={{ backgroundColor: '#3e81ee' }}>
                    <Button variant="text" size="small" style={{ color: "#fbfbfb", }}>
                      <Typography variant="caption" display="block" onClick={handleClose}>X Batal</Typography>
                    </Button>
                    <Button variant="contained" color="secondary"
                      style={{
                        border: "solid",
                        borderColor: "#fbfbfb",
                        borderRadius: 100,
                        position: "absolute",
                        bottom: "20%",
                        left: "51%"
                      }}
                      onClick={submitForm()}>

                      <Typography variant="caption" display="block">
                        <Build /> Simpan
                      </Typography>

                    </Button>
                  </CardActions>
                </form>
              </Card>
            </div>
          </Fade>
        </Modal>
      </React.Fragment >
    )
  }
}