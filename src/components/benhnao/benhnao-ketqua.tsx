import React, { useCallback, useState } from 'react';

import ImagePrintf from '../image/printf.png'

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import { CenterFocusStrong } from '@mui/icons-material';

const gt = [
  {
    value: 'nam',
    label: 'Nam'
  },
  {
    value: 'nu',
    label: 'Nữ'
  }
];

export const BenhNaoKetQua = (props) => {

  const [file, setFile] = useState(null);
  const [urlimg, setURL] = useState(null);
  const [values, setValues] = useState({
    sex: 'Nam',
    birthday: '',
    category: '',
  });
  const { data } = props;


  return (
    <Card {...props}
      sx={{
        height: 'auto',
        width: 600,
        marginTop: '-28px'
        // backgroundColor:'#e9ecef'
      }}
    >
      <CardContent
        sx={{
        }}
      >
        <div style={{
          border: '3px dashed #25A1E7',
          borderRadius: '10px',
          height: '294px',
          width: '550px',

        }}>
          <div style={{
            height: '100%',
            width: '100%'
          }} >
            <div style={{ textAlign: 'center' }}>
              {data ? (<img
                src={data.image1}
                style={{
                  width: 545,
                  height: 289,

                }}
              />) : (<div style={{ textAlign: 'center', paddingTop: '150px' }}>
                <p >Kết quả chẩn đoán</p>

              </div>)}
            </div>
          </div>
        </div>
        <Typography
          color="textprimary"
          variant="body2"
          fontSize={18}
          flexGrow={1}

        >
          Kết quả

        </Typography>
        <div style={{ display: 'flex' }}>
          {data ? (<TextField
            fullWidth
            type="text"
            value={data.result1}
            variant="outlined"
            aria-readonly
            sx={{ color: 'black' ,width:'75%'}}

          />) : (<TextField
            fullWidth
            label="Kết quả"
            type="text"
            variant="outlined"
            value=''
            aria-readonly
            sx={{ color: 'black' ,width:'75%'}}
          />)}
          <img style={{ backgroundColor: '#01B29D', height: 60, width: 60, border: '3px solid #25A1E7', marginLeft:'50px'}} src={ImagePrintf.src} ></img>

        </div>
      </CardContent>
      <Divider />

      <CardActions>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <textarea
              placeholder="Lời khuyên"
              // OnChange={setFormData}
              //  value={data.name.name}
              style={{ width: 550, height: 50, borderRadius: '5px' }}
            ></textarea>

          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <textarea
              placeholder="Ghi chú"
              // OnChange={setFormData}
              style={{ width: 550, height: 50, borderRadius: '5px' }}
            ></textarea>

          </Grid>
        </Grid>

      </CardActions>
     
    </Card>
  );
};
