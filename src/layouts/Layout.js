// import React from 'react';
// import clsx from 'clsx';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import Box from '@material-ui/core/Box';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Fab from '@material-ui/core/Fab';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
// import MenuIcon from '@material-ui/icons/Menu';
// import AddIcon from '@material-ui/icons/Add';
// import SearchIcon from '@material-ui/icons/Search';
// import Title from './Title';
// import InputBase from '@material-ui/core/InputBase';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { mainListItems, dividerDrawer, secondaryListItems } from './SideBar';
// import Content from './Content';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#3e81ee',
//     },
//     secondary: {
//       main: '#15aa63',
//     },
//   },
// });


// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   toolbar: {
//     padding: '0 24px 20px 24px',
//   },
//   toolbarIcon: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     ...theme.mixins.toolbar,
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     top: 'auto',
//     bottom: 0,
//     height: '6vh'
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   menuButtonHidden: {
//     display: 'none',
//   },
//   title: {
//     flexGrow: 1,
//   },
//   drawerPaper: {
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     webkitBoxShadow: '10px 0px 15px #b6b6b6',
//     mozBoxShadow: '10px 0px 15px #b6b6b6',
//     boxShadow: '10px 0px 15px #b6b6b6'
//   },
//   drawerPaperClose: {
//     overflowX: 'hidden',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     width: theme.spacing(0),
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(0),
//     },
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'auto',
//     flexDirection: 'column'
//   },
//   fixedHeight: {
//     height: 240,
//   },
//   fabButton: {
//     position: 'absolute',
//     zIndex: 1,
//     top: -41,
//     left: 0,
//     right: 0,
//     margin: '0 -40px',
//     border: 'solid',
//     borderColor: '#fafafa',
//     boxShadow: '0 0 #fafafa',
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//     borderBottom: 'solid',
//     borderColor: '#b6b6b6',
//   },
//   searchIcon: {
//     height: '100%',
//     pointerEvents: 'none',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   customList: {
//     backgroundColor: '#3e81ee',
//   }
// }));

// export default function Dashboard() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);
//   const handleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <MuiThemeProvider theme={theme}>

//       <div className={classes.root}>
//         <CssBaseline />
//         <Drawer
//           variant="permanent"
//           classes={{
//             paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
//           }}
//           open={open}
//         >
//           <Divider />
//           <List className={classes.customList} >{mainListItems}</List>
//           <Divider />
//           <List>{dividerDrawer}</List>
//           <List className={classes.customList} >{secondaryListItems}</List>
//         </Drawer>
//         <main className={classes.content}>
//           <Container maxWidth="lg" className={classes.container}>
//             <Grid container spacing={3}>
//               {/* Recent Orders */}
//               <Grid item xs={12}>
//                 <Box display="flex" flexDirection="row">
//                   <Box flexGrow={1} >
//                     <Title>Recent Orders</Title>
//                   </Box>

//                   <Box>
//                     <div className={classes.search}>
//                       <InputBase
//                         placeholder="Search…"
//                         classes={{
//                           root: classes.inputRoot,
//                           input: classes.inputInput,
//                         }}
//                         inputProps={{ 'aria-label': 'search' }}
//                         endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
//                       />
//                     </div>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Content />
//               </Grid>
//             </Grid>
//           </Container>
//         </main>
//         <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
//           <Toolbar className={classes.toolbar}>
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawer}
//               className={clsx(classes.menuButton, open)}
//             >
//               <MenuIcon />
//             </IconButton>

//             <div className={classes.title} />
//             <IconButton color="inherit">
//               <Fab color="secondary" aria-label="add" className={classes.fabButton}>
//                 <AddIcon />
//               </Fab>
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//       </div>
//     </MuiThemeProvider>
//   );
// }