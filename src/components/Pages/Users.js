import { Alert, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import BoxHeader from "../BoxHeader";
import { NavLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal } from 'react-bootstrap';
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";
import { GetApiService } from "../Apis/ApiService";

const Users = () => {
    const [list, setList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [userId, setUserId] = useState("");
    const [username,setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers('/ProjectApis/v1/usersList');
    }, []);

    // fetch users 
    const fetchUsers = async (url) => {
        try {

            await GetApiService(url).then((data) => {
                if (data.status === 1) {
                    setList(data.users);
                    console.log(data.users);
                }else{
                    setList([]);
                }
            });
            // const response = await fetch(url);
            // const data = await response.json();
            // setList(data);
            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    // delete user
    const DeleteDialog = (id,name) => {
        setFlag(true);
        setUserId(id);
        setUsername(name);
    }

    const handleClose = () => {
        setFlag(false);
    }

    const handleDelete = () => {

        const usersList = list.filter((deleteUser) => {
            return deleteUser.id !== userId;
        });

        setList(usersList);
        setFlag(false);

        // console.log("user id ", userId);
    }

    return (

        <Layout>
            <Box sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
                <div>
                    <BoxHeader title="Users List" />
                    <div className="box-content">
                        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>

                            <Table sx={{ minWidth: 600 }} aria-label="simple table" stickyHeader id="users">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SNo</TableCell>
                                        {/* <TableCell>EmpNo.</TableCell> */}
                                        <TableCell width="20px">Name</TableCell>
                                        <TableCell width="20px">Username</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell width="15px">Email</TableCell>
                                        <TableCell  width="10px">Phone</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        list.length > 0 ? list.map((data,index) => (
                                            <TableRow key={data.id}>
                                                <TableCell component="th" scope="row">{index+1}</TableCell>
                                                {/* <TableCell>{data.emp_number}</TableCell> */}
                                                <TableCell>{data.full_name}</TableCell>
                                                <TableCell>{data.user_name}</TableCell>
                                                <TableCell>{data.role}</TableCell>
                                                <TableCell>{data.email}</TableCell>
                                                <TableCell>{data.mobile_no}</TableCell>
                                                <TableCell>
                                                    <NavLink to={`/editUser/${data.id}`} >
                                                        <IconButton>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </NavLink><NavLink onClick={() => DeleteDialog(data.id,data.full_name)}>
                                                        <IconButton sx={{ color: 'red' }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </NavLink>
                                                </TableCell>
                                            </TableRow>
                                        )) : (<TableRow>
                                            <TableCell colSpan='7'><strong>No records found!</strong></TableCell>
                                        </TableRow>)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    <Dialog
                        open={flag}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Delete Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Alert severity="error">Are you sure want to delete <strong>{username}</strong>?</Alert>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} style={{ background: 'grey' }}>Cancel</Button>
                            <Button onClick={handleDelete} autoFocus style={{ background: 'red' }}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>


        </Layout>
    );
}

export default Users;