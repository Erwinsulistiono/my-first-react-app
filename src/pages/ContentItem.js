import React, { useEffect, useState } from 'react';
import ModalItem from './ModalItem';
import useModal from './useModal';
import { makeStyles } from '@material-ui/core/styles';
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
  const {isShowing, toggle} = useModal()
  const [items, setItems] = useState([])
  const [activeRow, setActiveRow] = useState({
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

  const classes = useStyles2();
  const [page, setPage] = useState(1);

  console.log(activeRow)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
                      onClick={
                        toggle
                      }>
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

      <ModalItem 
        isShowing={isShowing}
        hide={toggle}
      />
    </React.Fragment>
  );
}
