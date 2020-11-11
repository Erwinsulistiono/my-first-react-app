import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import CheckIcon from '@material-ui/icons/Check';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export const mainListItems = (
  <div>
    <ListItem button >
      <ListItemText
        style={{ color: '#fafafa' }}
        primary="Nama User"
        secondary={<Typography variant="caption" style={{ color: '#FFFFFF' }}>Jabatan</Typography>}
      />
    </ListItem>
  </div>
);

export const dividerDrawer = (
  <div>
    <ListSubheader >
      <Typography variant="overline" display="block" gutterBottom>
        Master Data
      </Typography>
    </ListSubheader>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon style={{ color: '#fafafa' }}>
        <CheckIcon />
      </ListItemIcon>
      <ListItemLink
        to='/item'
        style={{ color: '#fafafa' }}
        primary="Items" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{ color: '#fafafa' }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemLink
        to='/user'
        style={{ color: '#fafafa' }}
        primary="User" />
    </ListItem>
    <Divider />
    <ListItem button >
      <ListItemIcon style={{ color: '#fafafa' }}>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText
        style={{ color: '#fafafa' }}
        primary="Keluar" />
    </ListItem>
  </div>
);