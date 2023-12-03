import React, { useCallback, useState } from 'react';
import Image from "next/image"
import ImageUpload from '../image/uploadimage.png'
import Dropzone from 'react-dropzone'
import benhnaoService from "@services/benhnaoService";
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
const mohinh = [
  {
    value: 'x4',
    label: 'X4'
  },
  {
    value: 'yesno',
    label: 'Yes/No'
  }
];

export const BenhNaoUploadImage = (props) => {
  //load model 
  const [dataModel, setDataModel] = useState(null);

  async function loadModelBenh() {
    const json = await benhnaoService.postLoadModelNao()
    setDataModel(json);
  }
  if (!dataModel)
    loadModelBenh()


  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [urlimg, setURL] = useState(null);
  const [errors, setErrors] = useState('');
  const [values, setValues] = useState({
    sex: 'nam',
    age: '',
    category: 'x4',
  });
  const checkAllFields = () => {
    for (const key in values) {
      if (values.hasOwnProperty(key) && values[key].trim() === '') {
        return false;
      }
    }
    if (!file) {
      return false;
    }
    return true;
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    let newErrors = '';
    if ((event.target.name === 'age' && (isNaN(event.target.value) || event.target.value < 0 || event.target.value > 150))) {
      newErrors = 'Tuổi không hợp lệ';
      // setValues({
      //   ...values,
      //   [values.age]: "0"
      // });
    };

    setErrors(newErrors);
  };

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      setTimeout(() => {
   
        setIsClicked(false);
      }, 3000);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true)
    try {
      props.handleImageChange(null);
      const datasend = {
        'image': file,
        'datainfor': values
      }
       const datares = await benhnaoService.postChuandoanNao(datasend)
       console.log(datares)
       if (!isClicked) {
        
        {datares ? setIsClicked(false) : setIsClicked(true)}
        // setTimeout(() => {
     
        //   setIsClicked(false);
        // }, 1500);
      }
      props.handleImageChange(datares);

    } catch (error) { }
  };
  const handleDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0].type.startsWith('image/')) {
      const newFile = acceptedFiles[0];
      //setFile(acceptedFiles[0])
      setURL(URL.createObjectURL(acceptedFiles[0]))
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(reader.result); // Store the data URL in state
      };

      reader.readAsDataURL(newFile);


    }
  }, [])

  const handleRemove = useCallback(() => {
    URL.revokeObjectURL(urlimg)
    setFile(null)
    props.handleImageChange(null);
  }, [])
  return (
    <Card {...props}
      sx={{
        height: 'auto',
        width: 600,
        marginTop:'-28px'
        // backgroundColor:'#e9ecef'
      }}
    >
      <CardContent

      >
        <div style={{
          border: '3px dashed #25A1E7',
          borderRadius: '10px',
          height: ' 342px',
          width: '550px',
          
        }}>
          {!file ? (
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div style={{
                  height: '100%',
                  width: '100%'
                }} {...getRootProps()} >
                  <input  {...getInputProps()} />
                  <div style={{ textAlign: 'center', paddingTop: '65px' }}>
                    <Avatar
                      src={ImageUpload.src}
                      sx={{
                        height: 64,
                        width: 64,
                        marginLeft: '230px',
                        marginTop: '50px'
                      }}

                    />
                    <p >Kéo thả hoặc nhấp để tải lên ảnh</p>
                  </div>
                </div>
              )}
            </Dropzone>
          ) : (
            <div>
              <img style={{ width: 545, height: 337 }} src={urlimg} alt="Uploaded image" />
              <Button sx={{ backgroundColor: 'transparent', margin: '-613px  -65px 0', color: 'red' ,fontSize:'30px'}} onClick={handleRemove}>X</Button>  
            </div>
          )}
        </div>

      </CardContent>
      <Divider />
      <Typography
        color="textSecondary"
        variant="body2"
        fontSize={15}
        flexGrow={1}
        align='center'
      >
        Thông tin thêm
      </Typography>
      <CardActions>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Giới tính"
              name="sex"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.sex}
              variant="outlined"
            >
              {gt.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
          >
            <TextField
              fullWidth
              label="Tuổi"
              name="age"
              onChange={handleChange}
              type="number"
              value={values.age}
              variant="outlined"
              required
            />
            {errors ? errors : ''}
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Mô hình chuẩn đoán"
              name="category"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.category}
              variant="outlined"
            >
              {mohinh.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item md={6} xs={12}>
            {dataModel ? <Button disabled={isClicked} sx={{ backgroundColor: '#01B29D', float: 'right', color: 'black' }} onClick={onSubmit}>Chẩn đoán</Button> :
              <Button disabled sx={{ backgroundColor: '#01B29D', float: 'right', color: 'black', }} onClick={onSubmit}>Chẩn đoán</Button>
            }
          </Grid>
        </Grid>

      </CardActions>
    </Card>
  );
};
