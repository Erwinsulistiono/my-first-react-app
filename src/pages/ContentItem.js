import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Remove from '@material-ui/icons/Remove';
import Build from '@material-ui/icons/Build';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Card,
  CardActions
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStylesModal = makeStyles(theme => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: 0,
  },
}));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    padding: 20,
    paddingBottom: 55,
    webkitBoxShadow: '-1px 1px 5px #b6b6b6',
    mozBoxShadow: '-1px 1px 5px #b6b6b6',
    boxShadow: '-1px 1px 5px #b6b6b6'
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
});


export default function CustomPaginationActionsTable() {
  const rowsPerPage = 5;
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [activeRow, setActiveRow] = React.useState({
    id: '',
    code: '',
    category: '',
    description: '',
  })

  useEffect(() => {
    axios.get("http://localhost:8080/api/items", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setItems(res.data)
      })
      .catch(err => {
        alert("Failed Fetching Data")
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        setCategories(res.data)
      })
      .catch(err => {
        alert("Failed Fetching Data")
      })
  }, [])

  const classes = useStyles2();
  const classesModal = useStylesModal();
  const [page, setPage] = React.useState(1);

  console.log(activeRow)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - (page - 1) * rowsPerPage);

  return (
    <React.Fragment>
      <Paper className={classes.table}>
        <TableContainer>
          <Table className={classes.table} aria-label="custom pagination table">
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
              {(rowsPerPage > 0
                ? items.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                :
                items
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>{item.updatedBy}</TableCell>
                  <TableCell align="right">

                    <Fab
                      size="small"
                      color="red"
                      aria-label="add"
                      style={{ color: "white", backgroundColor: "red", boxShadow: "none", width: 36, height: 36 }}
                      onClick={() => {
                        
                      }}
                      >
                      <Remove />
                    </Fab>
                    <Fab
                      size="small"
                      color="red"
                      aria-label="add"
                      style={{ color: "white", backgroundColor: "#3e81ee", boxShadow: "none", width: 36, height: 36 }}
                      onClick={() => {
                        setActiveRow({
                          id: item.id,
                          code: item.code,
                          category: item.category.id,
                          description: item.description,
                        })
                        handleOpen()
                      }}>
                      <Build />
                    </Fab>

                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        className={classes.pagination}
        color="secondary"
        colSpan={5}
        page={page}
        count={Math.ceil(items.length / rowsPerPage)}
        onChange={handleChangePage}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classesModal.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className={classesModal.paper} >
              
                <Card>
                  <form style={{ width: 300 }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom fullWidth style={{ margin: 10 }}>
                      Edit Item
                    </Typography>

                    
                      <div>
                        <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                          <InputLabel htmlFor="code">Code</InputLabel>
                          <Input id="code" type="text" name="code" value={activeRow.code}/>
                        </FormControl>

                        <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                          <InputLabel htmlFor="description">Description</InputLabel>
                          <Input id="description" type="text" name="description" value={activeRow.description}/>
                        </FormControl>

                        <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                          <InputLabel htmlFor="group">Group</InputLabel>
                          <Select
                            labelId="group"
                            id="demo-simple-select"
                            value={activeRow.category}
                          >
                          
                          {(categories).map(cat => (
                          <MenuItem value={cat.id}>{cat.name}</MenuItem>
                          ))}
                          </Select>
                        </FormControl>

                        <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                          <InputLabel htmlFor="image">Image</InputLabel>
                          <Input id="image" multiline rows={5} />
                        </FormControl>
                      </div>
                      
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
                        >

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
    </React.Fragment>
  );
}
