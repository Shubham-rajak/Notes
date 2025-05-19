import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';

const navigation = [
    {
        icon: <HomeIcon />,
        url: '/',
        title: 'Home',
        iconcolor: 'text-blue'
    },
    {
        icon: <DeleteIcon />,
        url: '/trash',
        title: 'Trash',
        iconcolor: 'text-red'
    },
    {
        icon: <ArchiveIcon />,
        url: '/archive',
        title: 'Archive',
        iconcolor: 'text-brown'
    }
]

export default function MenuDrawer() {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            className="mt-3"
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    navigation.map((index) => (
                        <ListItem key={index.title} disablePadding>
                            <ListItemButton component={NavLink} to={index.url}>
                                <ListItemIcon className={index.iconcolor}>
                                    {index.icon}
                                </ListItemIcon>
                                <ListItemText primary={index.title} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
