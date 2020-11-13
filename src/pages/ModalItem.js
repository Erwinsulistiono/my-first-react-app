import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Build from '@material-ui/icons/Build';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Card,
  CardActions,
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import ReactDOM from 'react-dom';

const useStyle = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        background: theme.palette.background.paper,
        position: 'relative',
        margin: '1.75rem auto',
        borderRadius: 3,
        maxWidth: 500,
        padding: '2rem',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: 0,
    },
}));

export default function ModalItem({ isShowing, hide }) {
    const classes = useStyle;
    const [ count, setCount ] = useState(true)
    const [ categories, setCategories ] = useState({})

    useEffect(() => {
        if (count) {
            axios.get("http://localhost:8080/api/categories", {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(res => {
                console.log('pooooop')
                setCategories(res.data)
                alert("Success Fetching Data")
                setCount(!count)
                console.log(categories)
            })
            .catch(err => {
                console.log('pooooop')
                alert("Failed Fetching Data")
            })
        }
    }, [categories, count])

    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={isShowing}
                    onClose={hide}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    style={{ maxWidth: 330, top:'10%', left:'40%' }}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    >
                    <Fade in={isShowing}>
                        <div className={classes.paper} >
                            
                            <Card>
                                <form style={{ width: 300 }}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom fullWidth style={{ margin: 10 }}>
                                    Edit Item
                                </Typography>

                                
                                    <div>
                                    <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                                        <InputLabel htmlFor="code">Code</InputLabel>
                                        <Input id="code" type="text" name="code" />
                                    </FormControl>

                                    <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                                        <InputLabel htmlFor="description">Description</InputLabel>
                                        <Input id="description" type="text" name="description" />
                                    </FormControl>

                                    <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                                        <InputLabel htmlFor="group">Group</InputLabel>
                                        <Select
                                        labelId="group"
                                        id="demo-simple-select"
                                        >
                                        
                                        {(categories.id) ? (categories).map(cat => (
                                            <MenuItem value={cat.id}>{cat.name}</MenuItem>
                                        )) : <MenuItem value=''>Select</MenuItem> }
                                        </Select>
                                    </FormControl>

                                    <FormControl margin="normal" fullWidth style={{ margin: 10 }}>
                                        <InputLabel htmlFor="image">Image</InputLabel>
                                        <Input id="image" multiline rows={5} />
                                    </FormControl>
                                    </div>
                                    
                                <CardActions style={{ backgroundColor: '#3e81ee', width:330 }}>
                                    <Button variant="text" size="small" style={{ color: "#fbfbfb", }}>
                                    <Typography variant="caption" display="block" onClick={hide}>X Batal</Typography>
                                    </Button>
                                    <Button variant="contained" color="secondary"
                                    style={{
                                        border: "solid",
                                        borderColor: "#fbfbfb",
                                        borderRadius: 100,
                                        position: "absolute",
                                        bottom: "31%",
                                        left: "54%"
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
            </React.Fragment>, document.body
        )
    )
}