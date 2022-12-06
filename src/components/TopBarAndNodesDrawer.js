import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack } from '@mui/system';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const nodes = [
    { type: "Extension", name: "EXTENSION", color: "#3498db" },
    {
        type: "Condition", name: "CONDITION", color: "#f1c40f"
    },
    { type: "Action", name: "ACTION", color: "#2ecc71" },
]
export default function AppBarAndNodesDrawer(props) {
    const [open, setOpen] = React.useState(false);
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };
    return (
        <Box sx={{ display: 'flex' }} style={{ userSelect: "none", }}>
            <AppBar position="fixed" open={open} style={{ backgroundColor: "#2c3e50" }}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                        Dialplan Designer
                    </Typography>
                    <Button onClick={() => {
                        document.documentElement.style.setProperty('--react-flow-backgroundcolor', "#34495e")
                    }}>
                        dark theme
                    </Button>
                    <Button onClick={props.export}>
                        export
                    </Button>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={() => { setOpen(true); }}
                        sx={{ ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={() => { setOpen(false); }}>
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography>
                        Drag and drop nodes
                    </Typography>
                </DrawerHeader>

                <Divider />
                <Accordion >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        Generic Nodes
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ paddingTop: "15px" }}>
                            <Stack alignContent="center" direction="column" alignItems={"center"} spacing={2} >
                                {nodes.map((node, i) => (<div
                                    style={{
                                        borderRadius: "9px",
                                        border: "2px solid",
                                        borderColor: node.color,
                                        height: "50px",
                                        width: "200px",
                                        cursor: "grab",
                                        userSelect: "none",
                                    }}
                                    key={i}
                                    onDragStart={(event) => onDragStart(event, node.type)}
                                    draggable
                                >
                                    <Typography
                                        align="center"

                                        onDragStart={(event) => onDragStart(event, node.type)}
                                    >
                                        {node.name}
                                    </Typography>
                                </div>
                                ))}
                            </Stack>
                        </div>
                    </AccordionDetails>
                </Accordion>

            </Drawer>
        </Box >
    );
}