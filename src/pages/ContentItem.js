import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
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
  TextField,
  Card,
  CardActions
} from "@material-ui/core";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 1);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 1} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

  useEffect(() => {
    axios.get("http://localhost:8080/api/items", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        setItems(res.data)
      })
      .catch(err => {
        alert("Failed Fetching Data")
      })
  }, [])

  const classes = useStyles2();
  const [modal, setModal] = React.useState(false)
  const [page, setPage] = React.useState(1);
  const [activeRow, setActiveRow] = React.useState({
    id: '',
    code: '',
    category: '',
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const populateTable = (data) => {
  //   console.log(data)
  //   console.log(activeRow)
  //   setActiveRow({data});
  //   console.log(data)
  //   console.log(activeRow)
  // }
  

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
                      onClick={async () => {
                        await setActiveRow(item)
                        await setModal(true)
                        await console.log(activeRow)
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
                        setActiveRow({item})
                        setModal(true)
                        console.log(item)
                        console.log(activeRow)
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

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // style={modal}
        open={modal}
        onClose={
          setModal(false)
        }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}> */}
          {/* <div>
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
                    >

                    <Typography variant="caption" display="block">
                      <Build /> Simpan
                      </Typography>

                  </Button>
                </CardActions>
              </form>
            </Card>
          </div> */}
        {/* </Fade>
      </Modal> */}
    </React.Fragment>
  );
}
