import React from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import {
    FormControl,
    TextField
} from "@material-ui/core";

const NewThread = () => {
    return (
        <div style={
            {
                display: "flex",
                justifyContent: "center",
                margin: 20,
                padding: 20
            }
        }>
            <form style={
                {width: "50%"}
            }>
                <Toolbar>
                    <h1>New Thread</h1>
                </Toolbar>

                <FormControl margin="normal" fullWidth>
                    <TextField id="filled-basic" label="Subject" variant="filled"/>
                </FormControl>
            </form>
        </div>
    );
}

export default NewThread;
